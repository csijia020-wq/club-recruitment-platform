import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from "react";
import { CURRENT_STUDENT_ID, STORAGE_KEY, createInitialState } from "../data/mockData";
import { computeMatchScore, findClub } from "../lib/matching";
import { formatDateOnly, formatDateTime } from "../lib/helpers";
import { STATUS_FLOW, type ApprovalStatus, type ApplicationStatus, type DemoState, type StudentProfile } from "../types";

interface DemoContextValue {
  state: DemoState;
  currentStudent: StudentProfile;
  resetDemoData: () => void;
  setSelectedClubId: (clubId: string) => void;
  setActiveClubId: (clubId: string) => void;
  updateCurrentStudentProfile: (profile: StudentProfile) => void;
  submitApplication: (clubId: string, answers: Record<string, string>) => void;
  updateClubConfig: (clubId: string, payload: { deadline: string; slots: number; process: string[]; questions: string[] }) => void;
  sendBulkNotification: (clubId: string, status: ApplicationStatus, message: string) => void;
  moveApplicationStatus: (applicationId: string, direction: -1 | 1) => void;
  updateApprovalStatus: (approvalId: string, nextStatus: ApprovalStatus) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DemoState>(() => loadState());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentStudent = state.studentProfiles[CURRENT_STUDENT_ID];

  function resetDemoData() {
    const next = createInitialState();
    setState(next);
  }

  function setSelectedClubId(clubId: string) {
    setState((prev) => ({
      ...prev,
      selectedClubId: clubId
    }));
  }

  function setActiveClubId(clubId: string) {
    setState((prev) => ({
      ...prev,
      activeClubId: clubId
    }));
  }

  function updateCurrentStudentProfile(profile: StudentProfile) {
    setState((prev) => ({
      ...prev,
      studentProfiles: {
        ...prev.studentProfiles,
        [CURRENT_STUDENT_ID]: profile
      },
      notifications: [
        buildNotification(CURRENT_STUDENT_ID, "画像更新", "你的画像已更新", "推荐列表已根据最新兴趣、技能和时间偏好重新计算。"),
        ...prev.notifications
      ]
    }));
  }

  function submitApplication(clubId: string, answers: Record<string, string>) {
    setState((prev) => {
      const student = prev.studentProfiles[CURRENT_STUDENT_ID];
      const club = findClub(clubId);
      const match = computeMatchScore(student, club);
      const existing = prev.applications.find(
        (item) => item.studentId === CURRENT_STUDENT_ID && item.clubId === clubId
      );

      const applications: DemoState["applications"] = existing
        ? prev.applications.map((item) =>
            item.id === existing.id
              ? {
                  ...item,
                  answers,
                  status: "审核中" as const,
                  updatedAt: formatDateOnly(new Date()),
                  note: "已根据最新信息重新提交，等待社团审核。",
                  matchScore: match.score
                }
              : item
          )
        : [
            {
              id: `app-${Date.now()}`,
              studentId: CURRENT_STUDENT_ID,
              clubId,
              status: "审核中" as const,
              submittedAt: formatDateOnly(new Date()),
              updatedAt: formatDateOnly(new Date()),
              note: "申请已提交，预计 48 小时内完成初筛。",
              matchScore: match.score,
              answers
            },
            ...prev.applications
          ];

      return {
        ...prev,
        selectedClubId: clubId,
        applications,
        notifications: [
          buildNotification(CURRENT_STUDENT_ID, "报名成功", `${club.name} 报名已提交`, "你可以在 Dashboard 中持续查看最新进度变化。"),
          ...prev.notifications
        ]
      };
    });
  }

  function updateClubConfig(
    clubId: string,
    payload: { deadline: string; slots: number; process: string[]; questions: string[] }
  ) {
    setState((prev) => {
      const existing = prev.clubConfigs[clubId];
      const nextQuestions = payload.questions.map((label, index) => {
        const previous = existing.questions[index];
        return {
          id: previous ? previous.id : `${clubId}-custom-${index + 1}`,
          label,
          type: previous ? previous.type : "textarea",
          options: previous?.options ? [...previous.options] : undefined,
          optional: previous?.optional ?? false
        };
      });

      return {
        ...prev,
        clubConfigs: {
          ...prev.clubConfigs,
          [clubId]: {
            deadline: payload.deadline,
            slots: payload.slots,
            process: payload.process,
            questions: nextQuestions
          }
        }
      };
    });
  }

  function sendBulkNotification(clubId: string, status: ApplicationStatus, message: string) {
    if (!message.trim()) {
      return;
    }

    setState((prev) => {
      const club = findClub(clubId);
      const recipients = prev.applications.filter(
        (application) => application.clubId === clubId && application.status === status
      );

      const nextNotifications = recipients.map((application) =>
        buildNotification(application.studentId, "社团通知", `${club.name} 发送了新的通知`, message)
      );

      return {
        ...prev,
        notifications: [...nextNotifications, ...prev.notifications]
      };
    });
  }

  function moveApplicationStatus(applicationId: string, direction: -1 | 1) {
    setState((prev) => {
      const application = prev.applications.find((item) => item.id === applicationId);
      if (!application) {
        return prev;
      }

      const currentIndex = STATUS_FLOW.indexOf(application.status);
      const nextIndex = Math.max(0, Math.min(STATUS_FLOW.length - 1, currentIndex + direction));
      if (currentIndex === nextIndex) {
        return prev;
      }

      const nextStatus = STATUS_FLOW[nextIndex];
      const note =
        nextStatus === "已录取"
          ? "恭喜通过全部流程，请按通知完成入社确认。"
          : nextStatus === "婉拒"
            ? "当前批次未通过，欢迎继续关注后续开放活动。"
            : `状态已推进至「${nextStatus}」。`;

      return {
        ...prev,
        applications: prev.applications.map((item) =>
          item.id === applicationId
            ? {
                ...item,
                status: nextStatus,
                updatedAt: formatDateOnly(new Date()),
                note
              }
            : item
        ),
        notifications: [
          buildNotification(
            application.studentId,
            "流程更新",
            `${findClub(application.clubId).name} 状态更新为 ${nextStatus}`,
            note
          ),
          ...prev.notifications
        ]
      };
    });
  }

  function updateApprovalStatus(approvalId: string, nextStatus: ApprovalStatus) {
    setState((prev) => ({
      ...prev,
      approvals: prev.approvals.map((item) =>
        item.id === approvalId
          ? {
              ...item,
              status: nextStatus
            }
          : item
      )
    }));
  }

  return (
    <DemoContext.Provider
      value={{
        state,
        currentStudent,
        resetDemoData,
        setSelectedClubId,
        setActiveClubId,
        updateCurrentStudentProfile,
        submitApplication,
        updateClubConfig,
        sendBulkNotification,
        moveApplicationStatus,
        updateApprovalStatus
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoContext must be used within DemoProvider");
  }

  return context;
}

function loadState(): DemoState {
  const initial = createInitialState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initial;
    }

    const parsed = JSON.parse(raw) as Partial<DemoState>;
    return {
      ...initial,
      ...parsed,
      studentProfiles: {
        ...initial.studentProfiles,
        ...parsed.studentProfiles
      },
      clubConfigs: {
        ...initial.clubConfigs,
        ...parsed.clubConfigs
      },
      applications: parsed.applications ?? initial.applications,
      notifications: parsed.notifications ?? initial.notifications,
      approvals: parsed.approvals ?? initial.approvals
    };
  } catch {
    return initial;
  }
}

function buildNotification(studentId: string, type: string, title: string, body: string) {
  return {
    id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    studentId,
    type,
    title,
    body,
    date: formatDateTime(new Date())
  };
}

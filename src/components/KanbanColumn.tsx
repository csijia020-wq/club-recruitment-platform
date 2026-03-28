import { getStatusClass } from "../lib/helpers";
import { STATUS_FLOW, type ApplicationRecord, type ApplicationStatus, type StudentProfile } from "../types";

interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: ApplicationRecord[];
  studentProfiles: Record<string, StudentProfile>;
  onShift: (applicationId: string, direction: -1 | 1) => void;
}

export function KanbanColumn({
  status,
  applications,
  studentProfiles,
  onShift
}: KanbanColumnProps) {
  return (
    <section className="kanban-column">
      <h4>
        {status} ({applications.length})
      </h4>
      <div className="candidate-stack">
        {applications.length ? (
          applications.map((application) => {
            const student = studentProfiles[application.studentId];
            const currentIndex = STATUS_FLOW.indexOf(application.status);

            return (
              <article className="candidate-card" key={application.id}>
                <div className="candidate-card-top">
                  <div>
                    <strong>{student?.name ?? "未知学生"}</strong>
                    <p className="muted">
                      {student?.major ?? "未知专业"} · {student?.mbti ?? "--"}
                    </p>
                  </div>
                  <span className={`status-pill ${getStatusClass(application.status)}`}>
                    {application.status}
                  </span>
                </div>
                <p className="muted">匹配度 {application.matchScore}%</p>
                <p className="muted">{application.note}</p>
                <div className="card-actions">
                  {currentIndex > 0 ? (
                    <button
                      type="button"
                      className="chip-button"
                      onClick={() => onShift(application.id, -1)}
                    >
                      退回一步
                    </button>
                  ) : null}
                  {currentIndex < STATUS_FLOW.length - 1 ? (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => onShift(application.id, 1)}
                    >
                      推进状态
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-state">暂无申请人</div>
        )}
      </div>
    </section>
  );
}

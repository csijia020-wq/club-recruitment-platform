import { useEffect, useState } from "react";
import { getStatusClass } from "../lib/helpers";
import type {
  ApplicationRecord,
  ClubConfig,
  ClubProfile,
  StudentProfile
} from "../types";

interface ApplicationFormProps {
  club: ClubProfile;
  config: ClubConfig;
  existingApplication?: ApplicationRecord;
  student: StudentProfile;
  onSubmit: (clubId: string, answers: Record<string, string>) => void;
}

export function ApplicationForm({
  club,
  config,
  existingApplication,
  student,
  onSubmit
}: ApplicationFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    buildAnswers(config.questions, existingApplication?.answers)
  );

  useEffect(() => {
    setAnswers(buildAnswers(config.questions, existingApplication?.answers));
  }, [club.id, config.questions, existingApplication?.id]);

  return (
    <div className="application-shell">
      <div className="application-summary">
        <article className="mini-stat">
          <p className="muted">复用通用信息</p>
          <strong>{student.name}</strong>
          <p className="muted">
            {student.major} · {student.studentNo}
          </p>
        </article>
        <article className="mini-stat">
          <p className="muted">本次投递社团</p>
          <strong>{club.name}</strong>
          <p className="muted">只需补充社团专属问题</p>
        </article>
        <article className="mini-stat">
          <p className="muted">当前状态</p>
          <strong>{existingApplication?.status ?? "未提交"}</strong>
          <p className="muted">{existingApplication?.note ?? "提交后自动进入审核中"}</p>
        </article>
      </div>

      <form
        className="form-stack"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(club.id, answers);
        }}
      >
        {config.questions.map((question) => (
          <div key={question.id}>
            {question.type === "radio" ? (
              <fieldset className="option-fieldset">
                <legend>
                  {question.label}
                  {question.optional ? "（可选）" : ""}
                </legend>
                <div className="option-grid">
                  {question.options?.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`option-pill ${answers[question.id] === option ? "is-selected" : ""}`}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: option
                        }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : question.type === "textarea" ? (
              <label>
                <span>
                  {question.label}
                  {question.optional ? "（可选）" : ""}
                </span>
                <textarea
                  rows={4}
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: event.target.value
                    }))
                  }
                  required={!question.optional}
                />
              </label>
            ) : (
              <label>
                <span>
                  {question.label}
                  {question.optional ? "（可选）" : ""}
                </span>
                <input
                  type="text"
                  value={answers[question.id] ?? ""}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: event.target.value
                    }))
                  }
                  required={!question.optional}
                />
              </label>
            )}
          </div>
        ))}
        <button type="submit" className="primary-button">
          {existingApplication ? "更新申请并重新提交" : `提交 ${club.name} 报名`}
        </button>
      </form>

      {existingApplication ? (
        <div className="inline-status">
          <span className={`status-pill ${getStatusClass(existingApplication.status)}`}>
            {existingApplication.status}
          </span>
          <span className="muted">最近更新：{existingApplication.updatedAt}</span>
        </div>
      ) : null}
    </div>
  );
}

function buildAnswers(questions: ClubConfig["questions"], existing?: Record<string, string>) {
  return Object.fromEntries(
    questions.map((question) => [question.id, existing?.[question.id] ?? ""])
  );
}

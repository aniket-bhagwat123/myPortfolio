"use client";

import { useEffect, useState } from "react";
import { CircleAlert, MailCheck, X } from "lucide-react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  email: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 4500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast]);

  async function onSubmit(values) {
    setSubmitState({ status: "idle", message: "" });
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send your message right now.");
      }

      setSubmitState({
        status: "success",
        message: "Your message was sent successfully.",
      });
      setToast({
        status: "success",
        message: "Your message was sent successfully.",
      });
      reset(defaultValues);
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error.message || "Unable to send your message right now.",
      });
      setToast({
        status: "error",
        message: error.message || "Unable to send your message right now.",
      });
    }
  }

  return (
    <>
      {toast ? (
        <div aria-live="polite" className="contact-toast-stack">
          <div
            className={
              toast.status === "success"
                ? "contact-toast contact-toast--success"
                : "contact-toast contact-toast--error"
            }
            role="status"
          >
            <span className="contact-toast__icon">
              {toast.status === "success" ? (
                <MailCheck aria-hidden="true" size={18} strokeWidth={2} />
              ) : (
                <CircleAlert aria-hidden="true" size={18} strokeWidth={2} />
              )}
            </span>
            <p>{toast.message}</p>
            <button
              aria-label="Close notification"
              className="contact-toast__close"
              onClick={() => setToast(null)}
              type="button"
            >
              <X aria-hidden="true" size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      ) : null}

      <form className="contact-form glass-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="section-copy">
          <p className="eyebrow">Send a Message</p>
          <h3>Share your requirement and I will get it by email.</h3>
          <p>
            Add your name, email, and message below. The form sends everything
            directly to my inbox with a structured email format.
          </p>
        </div>

        <div className="form-grid">
          <label
            className={
              errors.name
                ? "contact-form__field contact-form__field--error"
                : "contact-form__field"
            }
          >
            <span>Your Name</span>
            <input
              aria-invalid={errors.name ? "true" : "false"}
              placeholder="Your full name"
              {...register("name", {
                required: "Please enter your name.",
                validate: (value) =>
                  value.trim().length >= 3 ||
                  "Name should be at least 3 characters.",
              })}
            />
            {errors.name ? (
              <small className="contact-form__error">{errors.name.message}</small>
            ) : null}
          </label>

          <label
            className={
              errors.email
                ? "contact-form__field contact-form__field--error"
                : "contact-form__field"
            }
          >
            <span>Your Email</span>
            <input
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: "Please enter your email address.",
                validate: (value) =>
                  emailPattern.test(value.trim()) ||
                  "Please enter a valid email address.",
              })}
            />
            {errors.email ? (
              <small className="contact-form__error">{errors.email.message}</small>
            ) : null}
          </label>
        </div>

        <label
          className={
            errors.message
              ? "contact-form__field contact-form__field--error"
              : "contact-form__field"
          }
        >
          <span>Message</span>
          <textarea
            aria-invalid={errors.message ? "true" : "false"}
            placeholder="Tell me about your requirement, timeline, or project details."
            rows={6}
            {...register("message", {
              required: "Please share your message.",
              validate: (value) =>
                value.trim().length >= 20 ||
                "Please add at least 20 characters so the requirement is clear.",
            })}
          />
          {errors.message ? (
            <small className="contact-form__error">{errors.message.message}</small>
          ) : null}
        </label>

        <div className="contact-form__footer">
          <button className="button button--primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitState.status === "success" ? (
            <p aria-live="polite" className="contact-form__success">
              <MailCheck aria-hidden="true" size={16} strokeWidth={2} />
              {submitState.message}
            </p>
          ) : (
            <p
              aria-live="polite"
              className={
                submitState.status === "error"
                  ? "contact-form__error contact-form__feedback"
                  : "contact-form__hint"
              }
            >
              {submitState.status === "error"
                ? submitState.message
                : "Messages are delivered directly to my inbox."}
            </p>
          )}
        </div>
      </form>
    </>
  );
}

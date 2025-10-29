import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const sendEmail = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    // ✅ Basic front-end validation
    if (!name || !email || !phone || !message) {
      setStatus({
        loading: false,
        success: null,
        error: "Please fill in all fields before submitting.",
      });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    emailjs
      .sendForm(
        "service_9tifj9b",
        "template_x6oiohs",
        formRef.current,
        "YreErvs_ygFJh-7eb"
      )
      .then(
        () => {
          setStatus({
            loading: false,
            success: "Message sent successfully!",
            error: null,
          });
          formRef.current.reset();
        },
        () => {
          setStatus({
            loading: false,
            success: null,
            error: "Failed to send message.",
          });
        }
      );
  };

  const FormFields = () => (
    <>
      <input type="hidden" name="title" value="Website Contact" />

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full rounded-full bg-zinc-100 px-4 py-3 outline-none"
        required
      />
      <textarea
        rows={5}
        name="message"
        placeholder="Type here..."
        className="w-full rounded-2xl bg-zinc-100 px-4 py-3 outline-none resize-none"
        required
      />
    </>
  );

  return (
    <section id="contact" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Top blue band */}
          <div className="bg-[#38b6ff] text-white p-6 sm:p-8 rounded-t-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Let’s Work Together!
                </h2>
                <p className="max-w-md leading-relaxed">
                  "I help men and women improve strength, balance, and endurance
                  to stay active and independent. While I specialize in
                  supporting clients in their 50s, 60s, and beyond, my approach
                  is adaptable for anyone looking to build lasting health and
                  vitality."
                </p>
              </div>

              {/* Mobile form */}
              <div className="lg:hidden">
                <div className="bg-white text-zinc-800 rounded-2xl shadow-xl p-6 sm:p-7 w-full mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Schedule Your Free Assessment
                  </h3>
                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="space-y-4"
                  >
                    <FormFields />
                    <button
                      type="submit"
                      className="w-full rounded-full px-6 py-3 bg-[#38b6ff] text-white shadow hover:opacity-95 active:opacity-90 transition"
                      disabled={status.loading}
                    >
                      {status.loading ? "Sending..." : "Submit"}
                    </button>
                    {status.success && (
                      <p className="text-green-600 text-sm mt-2">
                        {status.success}
                      </p>
                    )}
                    {status.error && (
                      <p className="text-red-600 text-sm mt-2">
                        {status.error}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom white details */}
          <div className="bg-white p-6 sm:p-8 border border-zinc-100 border-t-0 rounded-b-md lg:pt-24">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-700">
                <PhoneIcon className="w-5 h-5" />
                <span>(704) 614-1367</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700">
                <EnvelopeIcon className="w-5 h-5" />
                <span>stephanie@50fitnesstraining.com</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-700">
                <MapPinIcon className="w-5 h-5" />
                <span>Charlotte, NC</span>
              </li>
            </ul>
          </div>

          {/* Desktop overlapping form */}
          <div className="hidden lg:block absolute lg:right-8 top-1/2 -translate-y-1/2 z-10">
            <div className="bg-white text-zinc-800 rounded-2xl shadow-2xl p-7 w-[28rem] max-w-[90vw]">
              <h3 className="text-lg font-semibold mb-4">
                Schedule Your Free Assessment
              </h3>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <FormFields />
                <button
                  type="submit"
                  className="w-full rounded-full px-6 py-3 bg-[#38b6ff] text-white shadow hover:opacity-95 active:opacity-90 transition"
                  disabled={status.loading}
                >
                  {status.loading ? "Sending..." : "Submit"}
                </button>
                {status.success && (
                  <p className="text-green-600 text-sm mt-2">
                    {status.success}
                  </p>
                )}
                {status.error && (
                  <p className="text-red-600 text-sm mt-2">{status.error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

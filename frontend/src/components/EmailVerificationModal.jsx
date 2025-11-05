import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Send,
} from "lucide-react";
import { cn } from "../lib/utils";
import { authAPI } from "../services/api";

const EmailVerificationModal = ({
  isOpen,
  onClose,
  email,
  onVerificationComplete,
  onResendEmail,
}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, checking, verified, error

  useEffect(() => {
    if (!isOpen) return;

    // Reset state when modal opens
    setTimeLeft(60);
    setCanResend(false);
    setVerificationStatus("pending");

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await onResendEmail();
      setTimeLeft(60);
      setCanResend(false);
      
      // Restart countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    setVerificationStatus("checking");
    try {
      const response = await authAPI.checkVerification(email);
      
      if (response.data.verified === true) {
        setVerificationStatus("verified");
        setTimeout(() => {
          onVerificationComplete();
        }, 1500);
      } else {
        setVerificationStatus("error");
        setTimeout(() => {
          setVerificationStatus("pending");
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to check verification status:", error);
      setVerificationStatus("error");
      setTimeout(() => {
        setVerificationStatus("pending");
      }, 3000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xl ackdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-20 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="relative p-6 rounded-t-2xl overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3282B8] via-[#52DE97] to-[#3AB795] opacity-90"></div>

          {/* Floating elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-10 rounded-full blur-2xl -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2D4B7C] to-transparent opacity-20 rounded-full blur-xl translate-y-12 -translate-x-12 animate-float"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                  <Mail className="h-7 w-7 text-black drop-shadow-sm" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#52DE97] rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                  Verify Your Email
                </h2>
                <p className="text-white text-opacity-90 text-sm font-medium">
                  Check your inbox to continue
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 backdrop-blur-sm border border-white border-opacity-20"
            >
              <X className="h-5 w-5 text-white group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-gradient-to-b from-white to-gray-50">
          {/* Email Display */}
          <div className="text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{email}</span>
            </div>
            <p className="text-gray-600 text-sm">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          {/* Verification Status */}
          <div className="text-center">
            {verificationStatus === "pending" && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <p className="text-gray-600">Waiting for email verification...</p>
              </div>
            )}

            {verificationStatus === "checking" && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                  </div>
                </div>
                <p className="text-gray-600">Checking verification status...</p>
              </div>
            )}

            {verificationStatus === "verified" && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-green-50 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <p className="text-green-600 font-medium">Email verified successfully!</p>
                <p className="text-gray-600 text-sm">Redirecting you to the dashboard...</p>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-red-50 rounded-full">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
                <p className="text-red-600 font-medium">Email not verified yet</p>
                <p className="text-gray-600 text-sm">Please check your email and click the verification link.</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {verificationStatus !== "verified" && (
              <button
                onClick={handleCheckVerification}
                disabled={verificationStatus === "checking"}
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2",
                  verificationStatus === "checking"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-[#3282B8] text-white hover:bg-[#2D4B7C] hover:shadow-md"
                )}
              >
                {verificationStatus === "checking" ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>I've Verified My Email</span>
                  </>
                )}
              </button>
            )}

            {/* Resend Email Button */}
            {verificationStatus !== "verified" && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the email?
                </p>
                <button
                  onClick={handleResendEmail}
                  disabled={!canResend || isResending}
                  className={cn(
                    "inline-flex items-center space-x-2 text-sm font-medium transition-colors duration-200",
                    canResend && !isResending
                      ? "text-[#52DE97] hover:text-[#3AB795] cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  )}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>
                        {canResend ? "Resend Email" : `Resend in ${formatTime(timeLeft)}`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Check your spam folder if you don't see the email in your inbox.
              <br />
              You can close this window and verify your email later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
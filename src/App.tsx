import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LoginScreen } from "./components/LoginScreen";
import { EmployeeHome } from "./components/EmployeeHome";
import { AvatarDialogue } from "./components/AvatarDialogue";
import { CounselingMode } from "./components/CounselingMode";
import { SCQuestionnaire } from "./components/SCQuestionnaire";
import { ConversationHistory } from "./components/ConversationHistory";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { ManagerIndividualView } from "./components/ManagerIndividualView";
import { HRDashboard } from "./components/HRDashboard";
import { HRIndividual } from "./components/HRIndividual";
import { SCGroupAnalysis } from "./components/SCGroupAnalysis";
import { PhysicianView } from "./components/PhysicianView";
import { AdminConsole } from "./components/AdminConsole";

type UserRole =
  | "employee"
  | "manager"
  | "hr"
  | "physician"
  | "admin";

type Screen =
  | "login"
  | "employee-home"
  | "avatar-dialogue"
  | "counseling"
  | "sc-questionnaire"
  | "conversation-history"
  | "manager-dashboard"
  | "manager-individual"
  | "hr-dashboard"
  | "hr-individual"
  | "sc-analysis"
  | "physician"
  | "admin";

export default function App() {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole | null>(
    null,
  );
  const [userName, setUserName] = useState(t('common.defaultUsername'));
  const [selectedEmployee, setSelectedEmployee] = useState<
    string | null
  >(null);
  const [dialogueMode, setDialogueMode] = useState<
    "normal" | "counseling"
  >("normal");
  const [
    scQuestionnaireCompleted,
    setSCQuestionnaireCompleted,
  ] = useState(false);
  const [workReadiness, setWorkReadiness] = useState(45); // Low WR score to trigger consent dialog
  const [physicianConsentGiven, setPhysicianConsentGiven] =
    useState(false);
  const [showConsentDialog, setShowConsentDialog] =
    useState(false);
  const [lastConsentDeclineDate, setLastConsentDeclineDate] =
    useState<Date | null>(null);

  // Admin configurable settings
  const [
    physicianConsentThreshold,
    setPhysicianConsentThreshold,
  ] = useState(50);
  const [consentReminderDays, setConsentReminderDays] =
    useState(7);

  // SC Questionnaire settings
  const [scFrequency, setSCFrequency] = useState<
    "none" | "weekly" | "biweekly" | "monthly" | "quarterly"
  >("monthly");
  const [lastSCCompletionDate, setLastSCCompletionDate] =
    useState<Date | null>(new Date(2024, 9, 15)); // Oct 15, 2024
  const [showSCReminderDialog, setShowSCReminderDialog] =
    useState(false);
  const [
    lastSCReminderDeclineDate,
    setLastSCReminderDeclineDate,
  ] = useState<Date | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    switch (role) {
      case "employee":
        setCurrentScreen("employee-home");
        break;
      case "manager":
        setCurrentScreen("manager-dashboard");
        break;
      case "hr":
        setCurrentScreen("hr-dashboard");
        break;
      case "physician":
        setCurrentScreen("physician");
        break;
      case "admin":
        setCurrentScreen("admin");
        break;
    }
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setUserRole(null);
    setSelectedEmployee(null);
  };

  const handleNavigate = (
    screen: Screen,
    employeeId?: string,
  ) => {
    setCurrentScreen(screen);
    if (employeeId) {
      setSelectedEmployee(employeeId);
    }
  };

  // Check if employee WR is low and show consent dialog
  useEffect(() => {
    if (
      currentScreen === "employee-home" &&
      userRole === "employee" &&
      workReadiness < physicianConsentThreshold &&
      !physicianConsentGiven &&
      !showConsentDialog
    ) {
      // Check if enough time has passed since last decline
      let shouldShow = true;
      if (lastConsentDeclineDate) {
        const daysSinceDecline = Math.floor(
          (new Date().getTime() -
            lastConsentDeclineDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        shouldShow = daysSinceDecline >= consentReminderDays;
      }

      if (shouldShow) {
        // Show consent dialog after a short delay for better UX
        const timer = setTimeout(() => {
          setShowConsentDialog(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [
    currentScreen,
    userRole,
    workReadiness,
    physicianConsentGiven,
    showConsentDialog,
    physicianConsentThreshold,
    lastConsentDeclineDate,
    consentReminderDays,
  ]);

  // Check if SC questionnaire should be shown based on frequency
  useEffect(() => {
    if (
      currentScreen === "employee-home" &&
      userRole === "employee" &&
      scFrequency !== "none" &&
      lastSCCompletionDate &&
      !showSCReminderDialog &&
      !showConsentDialog // Don't show SC reminder if consent dialog is visible
    ) {
      const now = new Date();
      const daysSinceCompletion = Math.floor(
        (now.getTime() - lastSCCompletionDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      let shouldShow = false;
      switch (scFrequency) {
        case "weekly":
          shouldShow = daysSinceCompletion >= 7;
          break;
        case "biweekly":
          shouldShow = daysSinceCompletion >= 14;
          break;
        case "monthly":
          shouldShow = daysSinceCompletion >= 30;
          break;
        case "quarterly":
          shouldShow = daysSinceCompletion >= 90;
          break;
      }

      // Check if user declined recently
      if (shouldShow && lastSCReminderDeclineDate) {
        const daysSinceDecline = Math.floor(
          (now.getTime() -
            lastSCReminderDeclineDate.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        // Show again after 3 days if they declined
        shouldShow = daysSinceDecline >= 3;
      }

      // Only show if WR check doesn't require consent dialog OR physician consent already given
      const needsPhysicianConsent =
        workReadiness < physicianConsentThreshold &&
        !physicianConsentGiven;

      if (shouldShow && !needsPhysicianConsent) {
        // Show SC reminder dialog after a delay (longer than consent dialog)
        const timer = setTimeout(() => {
          setShowSCReminderDialog(true);
        }, 2500); // Slightly longer delay to ensure consent dialog shows first
        return () => clearTimeout(timer);
      }
    }
  }, [
    currentScreen,
    userRole,
    scFrequency,
    lastSCCompletionDate,
    showSCReminderDialog,
    lastSCReminderDeclineDate,
    showConsentDialog,
    workReadiness,
    physicianConsentThreshold,
    physicianConsentGiven,
  ]);

  const handlePhysicianConsent = () => {
    setPhysicianConsentGiven(true);
    setShowConsentDialog(false);
  };

  const handlePhysicianConsentDecline = () => {
    setShowConsentDialog(false);
    setLastConsentDeclineDate(new Date());
    // Option: Can show again later if WR remains low
  };

  const handleSCReminderAccept = () => {
    setShowSCReminderDialog(false);
    handleNavigate("sc-questionnaire");
  };

  const handleSCReminderDecline = () => {
    setShowSCReminderDialog(false);
    setLastSCReminderDeclineDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {currentScreen === "employee-home" && (
        <EmployeeHome
          userName={userName}
          scQuestionnaireCompleted={scQuestionnaireCompleted}
          workReadiness={workReadiness}
          physicianConsentGiven={physicianConsentGiven}
          showConsentDialog={showConsentDialog}
          showSCReminderDialog={showSCReminderDialog}
          scFrequency={scFrequency}
          lastSCCompletionDate={lastSCCompletionDate}
          onStartDialogue={() =>
            handleNavigate("avatar-dialogue")
          }
          onStartCounseling={() => {
            if (scQuestionnaireCompleted) {
              setDialogueMode("counseling");
              handleNavigate("counseling");
            }
          }}
          onStartQuestionnaire={() =>
            handleNavigate("sc-questionnaire")
          }
          onViewConversationHistory={() =>
            handleNavigate("conversation-history")
          }
          onPhysicianConsent={handlePhysicianConsent}
          onPhysicianConsentDecline={
            handlePhysicianConsentDecline
          }
          onSCReminderAccept={handleSCReminderAccept}
          onSCReminderDecline={handleSCReminderDecline}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "avatar-dialogue" && (
        <AvatarDialogue
          onBack={() => handleNavigate("employee-home")}
        />
      )}

      {currentScreen === "counseling" && (
        <CounselingMode
          onBack={() => handleNavigate("employee-home")}
        />
      )}

      {currentScreen === "sc-questionnaire" && (
        <SCQuestionnaire
          onComplete={() => {
            setSCQuestionnaireCompleted(true);
            setLastSCCompletionDate(new Date());
            setShowSCReminderDialog(false);
            handleNavigate("employee-home");
          }}
          onBack={() => handleNavigate("employee-home")}
        />
      )}

      {currentScreen === "conversation-history" && (
        <ConversationHistory
          onBack={() => handleNavigate("employee-home")}
        />
      )}

      {currentScreen === "manager-dashboard" && (
        <ManagerDashboard
          onViewIndividual={(employeeId) =>
            handleNavigate("manager-individual", employeeId)
          }
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "manager-individual" &&
        selectedEmployee && (
          <ManagerIndividualView
            employeeId={selectedEmployee}
            onBack={() => handleNavigate("manager-dashboard")}
          />
        )}

      {currentScreen === "hr-dashboard" && (
        <HRDashboard
          onViewIndividual={(employeeId) =>
            handleNavigate("hr-individual", employeeId)
          }
          onViewSCAnalysis={() => handleNavigate("sc-analysis")}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "hr-individual" &&
        selectedEmployee && (
          <HRIndividual
            employeeId={selectedEmployee}
            onBack={() => handleNavigate("hr-dashboard")}
          />
        )}

      {currentScreen === "sc-analysis" && (
        <SCGroupAnalysis
          onBack={() => handleNavigate("hr-dashboard")}
        />
      )}

      {currentScreen === "physician" && (
        <PhysicianView onLogout={handleLogout} />
      )}

      {currentScreen === "admin" && (
        <AdminConsole
          onLogout={handleLogout}
          physicianConsentThreshold={physicianConsentThreshold}
          consentReminderDays={consentReminderDays}
          onUpdatePhysicianConsentThreshold={
            setPhysicianConsentThreshold
          }
          onUpdateConsentReminderDays={setConsentReminderDays}
        />
      )}
    </div>
  );
}
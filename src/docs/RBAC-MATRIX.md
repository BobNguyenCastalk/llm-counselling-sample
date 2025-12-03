# Role-Based Access Control (RBAC) Matrix

## 1. Role Definitions

### 1.1 Employee
- **Target**: All employees
- **Scope**: Own data only
- **Purpose**: Self-care and self-monitoring

### 1.2 Manager
- **Target**: Management staff
- **Scope**: Direct reports' data
- **Purpose**: Team management and early detection

### 1.3 HR (Human Resources)
- **Target**: HR department staff
- **Scope**: Abstracted data for all employees
- **Purpose**: Organization-wide health management and HR policies

### 1.4 Physician (Occupational Physician)
- **Target**: Occupational physicians and health nurses
- **Scope**: Detailed data for consented employees
- **Purpose**: Medical evaluation and professional intervention

### 1.5 Admin (System Administrator)
- **Target**: System operations staff
- **Scope**: System settings and user management
- **Purpose**: System operations and configuration management

---

## 2. Data Access Permission Matrix

### 2.1 Work Readiness (WR) Score

| Role | Self | Direct Reports | Consented Employees | All Employees | Detail Level |
|------|------|----------------|---------------------|---------------|--------------|
| Employee | ✅ | ❌ | ❌ | ❌ | Numeric (0-100) |
| Manager | ✅ | 🟡 3 levels | ❌ | ❌ | Good/Attention/Needs Attention |
| HR | ❌ | ❌ | ❌ | ✅ | Numeric (0-100) |
| Physician | ❌ | ❌ | ✅ | ❌ | Numeric (0-100) + Trend Analysis |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Notes**:
- 🟡 = Conditional access (3-level abstraction: Good/Attention/Needs Attention)

### 2.2 SC Questionnaire Results

| Role | Self | Direct Reports | Consented Employees | All Employees | Detail Level |
|------|------|----------------|---------------------|---------------|--------------|
| Employee | ✅ | ❌ | ❌ | ❌ | All questions, answers, detailed scores |
| Manager | ✅ | ❌ | ❌ | ❌ | No access (cannot view subordinate data) |
| HR | ❌ | ❌ | ❌ | ✅ | Category summary scores only |
| Physician | ❌ | ❌ | ✅ | ❌ | All questions, answers, detailed scores |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Important**: SC questionnaire contains psychological details, never disclosed to managers.

### 2.3 Counseling Mode Dialogue History

| Role | Self | Direct Reports | Consented Employees | All Employees | Detail Level |
|------|------|----------------|---------------------|---------------|--------------|
| Employee | ✅ | ❌ | ❌ | ❌ | Full dialogue history |
| Manager | ❌ | ❌ | ❌ | ❌ | No Access |
| HR | ❌ | ❌ | ❌ | ❌ | No Access |
| Physician | ❌ | ❌ | ✅ | ❌ | Full dialogue history + summary |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Important**: Dialogue history is top secret. Physicians can only access with employee consent.

### 2.4 Slack Behavior Trend Data

| Role | Self | Direct Reports | Consented Employees | All Employees | Detail Level |
|------|------|----------------|---------------------|---------------|--------------|
| Employee | ✅ | ❌ | ❌ | ❌ | Sentiment analysis + behavior metrics |
| Manager | ❌ | ❌ | ❌ | ❌ | No Access |
| HR | ❌ | ❌ | ❌ | ✅ | Abstracted metrics + sentiment analysis |
| Physician | ❌ | ❌ | ✅ | ❌ | Detailed metrics + sentiment analysis |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Important**:
- Original text is **not accessible by anyone** (not stored)
- Only abstracted features are stored and displayed
- HR can view sentiment analysis results (implemented 2024/11)

### 2.5 Medical Findings and Physician Recommendations

| Role | Self | Direct Reports | Consented Employees | All Employees | Permission |
|------|------|----------------|---------------------|---------------|------------|
| Employee | ✅ | ❌ | ❌ | ❌ | View only |
| Manager | ❌ | ❌ | ❌ | ❌ | No Access |
| HR | ❌ | ❌ | ❌ | 🟡 Consented only | View only (recommended actions displayed) |
| Physician | ❌ | ❌ | ✅ | ❌ | Create, Edit, View |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Notes**:
- 🟡 = Only when employee has given consent to physician, HR can view recommendations

### 2.6 Group Analysis and Statistical Data

| Role | Self | Direct Reports | Consented Employees | All Employees | Detail Level |
|------|------|----------------|---------------------|---------------|--------------|
| Employee | ❌ | ❌ | ❌ | ❌ | No Access |
| Manager | ❌ | ✅ | ❌ | ❌ | Department statistics and trend analysis |
| HR | ❌ | ❌ | ❌ | ✅ | Company-wide statistics and department analysis |
| Physician | ❌ | ❌ | ❌ | ✅ | Company-wide statistics (anonymized) |
| Admin | ❌ | ❌ | ❌ | ❌ | No Access |

**Important**:
- Groups with fewer than 5 people are not displayed due to identification risk
- All statistical data is anonymized

---

## 3. Feature Permission Matrix

### 3.1 SC Questionnaire Related

| Feature | Employee | Manager | HR | Physician | Admin |
|---------|----------|---------|-----|-----------|-------|
| Take Test | ✅ | ✅ (self only) | ✅ (self only) | ✅ (self only) | ❌ |
| View Results (self) | ✅ | ✅ | ✅ | ✅ | ❌ |
| View Results (others) | ❌ | ❌ | 🟡 Summary only | 🟡 Consented only | ❌ |
| Set Test Frequency | ❌ | ❌ | ❌ | ❌ | ✅ |
| Receive Reminders | ✅ | ❌ | ❌ | ❌ | ❌ |

### 3.2 Counseling Mode

| Feature | Employee | Manager | HR | Physician | Admin |
|---------|----------|---------|-----|-----------|-------|
| Use Mode | 🟡 After SC completion | ❌ | ❌ | ❌ | ❌ |
| View Dialogue History (self) | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Dialogue History (others) | ❌ | ❌ | ❌ | 🟡 Consented only | ❌ |
| Delete Dialogue Data | ✅ (self only) | ❌ | ❌ | ❌ | ❌ |

**Important**:
- 🟡 = SC questionnaire completion is required to use counseling mode

### 3.3 Physician Consultation and Consent Management

| Feature | Employee | Manager | HR | Physician | Admin |
|---------|----------|---------|-----|-----------|-------|
| Grant Physician Consent | ✅ | ❌ | ❌ | ❌ | ❌ |
| Revoke Physician Consent | ✅ | ❌ | ❌ | ❌ | ❌ |
| Check Consent Status (self) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Check Consent Status (others) | ❌ | ❌ | 🟡 Statistics only | ✅ | ❌ |
| Create Consultation Records | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edit Medical Findings | ❌ | ❌ | ❌ | ✅ | ❌ |
| Edit Recommendations | ❌ | ❌ | ❌ | ✅ | ❌ |
| Set Physician Consent Threshold | ❌ | ❌ | ❌ | ❌ | ✅ |

### 3.4 Notifications and Alerts

| Feature | Employee | Manager | HR | Physician | Admin |
|---------|----------|---------|-----|-----------|-------|
| Receive WR Drop Alert (self) | ✅ | ✅ | ✅ | ✅ | ❌ |
| Receive WR Drop Alert (subordinates) | ❌ | ✅ | ❌ | ❌ | ❌ |
| Receive WR Drop Alert (all) | ❌ | ❌ | ✅ | ✅ | ❌ |
| Receive SC Reminders | ✅ | ❌ | ❌ | ❌ | ❌ |
| Receive Physician Consent Request | ✅ | ❌ | ❌ | ❌ | ❌ |

### 3.5 System Settings and Management

| Feature | Employee | Manager | HR | Physician | Admin |
|---------|----------|---------|-----|-----------|-------|
| User Registration/Deletion | ❌ | ❌ | ❌ | ❌ | ✅ |
| Role Assignment | ❌ | ❌ | ❌ | ❌ | ✅ |
| SC Frequency Setting | ❌ | ❌ | ❌ | ❌ | ✅ |
| Physician Consent Threshold Setting | ❌ | ❌ | ❌ | ❌ | ✅ |
| Data Retention Period Setting | ❌ | ❌ | ❌ | ❌ | ✅ |
| View Audit Logs | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 4. Data Detail Level Definitions

### Level 1: Public Information
- **Content**: Statistical data, anonymized aggregates
- **Access**: Manager (subordinate statistics), HR (company-wide statistics), Physician (company-wide statistics)

### Level 2: Abstracted Personal Information
- **Content**: WR numeric value, SC summary scores, behavior trend metrics
- **Access**: HR (all employees), Physician (consented employees)

### Level 3: Restricted Detailed Information
- **Content**: WR detailed trends, behavior trend details
- **Access**: Physician (consented employees only)

### Level 4: Confidential Personal Information
- **Content**: All SC questionnaire answers, counseling dialogue history
- **Access**: Self, Physician (with consent only)

### Level 5: Medical Information
- **Content**: Medical findings, diagnoses, treatment recommendations
- **Access**: Self, Physician (creator), HR (recommendations only with consent)

---

## 5. Consent Management Flow

### 5.1 Consent Process for Physician Access

```
Trigger: WR < threshold (default 50)

1. [Employee] Consent dialog displayed
   ↓
2. [Employee] Agree / Decline / Decide Later
   ↓
   【If Agreed】
   3a. [System] Grant physician access to employee data
   4a. [Physician] Can view detailed data
   5a. [Physician] Create medical findings and recommendations
   6a. [HR] Can view recommendations (displayed as recommended actions)

   【If Declined】
   3b. [System] Record consent refusal
   4b. [System] Show dialog again after 7 days

   【If Decide Later selected】
   3c. [System] Show dialog again at next login
```

### 5.2 Consent Revocation

```
1. [Employee] Revoke consent from settings screen
   ↓
2. [System] Immediately remove physician access
   ↓
3. [Physician] Employee removed from consented list
   ↓
4. [HR] Physician recommendations for employee become hidden
```

---

## 6. Privacy Protection Principles

### 6.1 Data Minimization
- **Principle**: Each role can only access the minimum data needed for their duties
- **Implementation**: Managers see only 3-level abstracted WR, HR sees only summary data

### 6.2 Purpose Limitation
- **Principle**: Data is not used for purposes other than collection purpose
- **Implementation**: SC data used only for health management, prohibited for HR evaluations

### 6.3 Informed Consent
- **Principle**: Access to highly confidential data requires explicit consent
- **Implementation**: Explicit consent for physician access, consent can be revoked anytime

### 6.4 Data Non-Storage
- **Principle**: Highly confidential original text data is not stored
- **Implementation**:
  - Slack message original text is not stored (only features)
  - Counseling dialogues are encrypted, deletable by the individual

### 6.5 Anonymization and Aggregation
- **Principle**: Statistical data provided in non-identifiable form
- **Implementation**:
  - Groups with fewer than 5 people are not displayed
  - Department statistics show only averages and distributions

---

## 7. Permission Checklist

### When an Employee logs in
- [ ] Can view own WR score
- [ ] Can view own SC questionnaire results
- [ ] Can view own counseling history
- [ ] Cannot view other employees' data
- [ ] Can view physician recommendations (addressed to self)
- [ ] Can receive SC reminders
- [ ] Can receive physician consent dialog

### When a Manager logs in
- [ ] Can view subordinates' WR in 3 levels (Good/Attention/Needs Attention)
- [ ] Cannot view subordinates' detailed WR numeric values
- [ ] Cannot view subordinates' SC questionnaire results
- [ ] Cannot view subordinates' counseling history
- [ ] Can view department-wide statistics
- [ ] Can receive WR drop alerts

### When HR logs in
- [ ] Can view WR numeric values for all employees
- [ ] Can view SC questionnaire category summaries
- [ ] Can view Slack behavior trends (abstracted + sentiment analysis)
- [ ] Can view physician recommendations (consented employees only)
- [ ] Cannot view individual SC questions and answers
- [ ] Cannot view counseling history

### When a Physician logs in
- [ ] Can view all data for consented employees
- [ ] Cannot view data for non-consented employees
- [ ] Can create and edit medical findings and recommendations
- [ ] Can view company-wide statistics (anonymized)
- [ ] Cannot change system settings

### When an Admin logs in
- [ ] Can manage users
- [ ] Can set SC frequency
- [ ] Can set physician consent threshold
- [ ] Cannot view employee personal data
- [ ] Can view audit logs

---

## 8. Violation Cases and Responses

### 8.1 Unauthorized Access Attempts
- **Detection**: Permission check at API level
- **Response**: Deny access, record audit log, notify administrator

### 8.2 Data Breach Risk
- **Detection**: Monitor abnormal data access patterns
- **Response**: Suspend account temporarily, begin investigation

### 8.3 Access Without Consent
- **Detection**: Physician attempts to access non-consented employee data
- **Response**: Deny access, display error message

---

## 9. Regular Review

- **Frequency**: Quarterly
- **Review Items**:
  - Appropriateness of permission settings
  - Anomaly detection in access logs
  - Consent management operations
  - Effectiveness of privacy protection
- **Responsible**: System Administrator + HR Director

---

## 10. Summary: MECE Principle Verification

### Mutually Exclusive
✅ Each role's permissions defined without overlap
✅ Manager has no detailed data, HR has abstracted data, Physician has consented only
✅ Permission levels for same data clearly separated

### Collectively Exhaustive
✅ Permissions defined for all roles on all data types
✅ Availability defined for all roles on all features
✅ Access possible/impossible is clear (no gray zones)
✅ Conditional access (🟡) also clearly defined

### Additional Verification
✅ All 5 roles covered
✅ All 6 data types covered
✅ All 5 feature categories covered
✅ Privacy protection principles documented
✅ Consent management flow documented

---

**Last Updated**: 2024/11/18
**Version**: 1.0
**Approved by**: System Administrator, HR Director, Occupational Physician

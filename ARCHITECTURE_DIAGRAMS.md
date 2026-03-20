# Architecture Visualization

## App Data Flow Diagram

```
User Interaction
       ↓
   Component (UI)
       ↓
  Callback/Event
       ↓
   Container (Logic)
       ↓
 ┌─────┴─────┐
 ↓           ↓
Store      API Service
 ↓           ↓
 └─────┬─────┘
       ↓
   Component (Re-render)
       ↓
  Updated UI
```

## Navigation Flow

```
App Start
   ↓
RootNavigator
   ↓
isAuthenticated?
   ├─→ Yes → UserListContainer
   │          ├─→ UserListScreen
   │          ├─→ UserDetailContainer
   │          │    └─→ UserDetailScreen
   │          └─→ AddEditUserContainer
   │               └─→ AddEditUserScreen
   │
   └─→ No → SignInContainer
            └─→ SignInScreen (Login)
                   ↓
              Validation
                   ↓
              setAuthenticated
                   ↓
              Reset → UserListContainer
```

## Component Hierarchy

```
RootNavigator
├── SignInContainer
│   └── SignInScreen
│       ├── CustomTextInput (Email)
│       ├── CustomTextInput (Password)
│       └── CustomButton (Sign In)
│
└── UserListContainer
    └── UserListScreen
        ├── FlatList
        │   └── UserItem (TouchableOpacity)
        │       ├── Image (Avatar)
        │       └── View (UserInfo)
        ├── CustomButton (Add User)
        └── CustomButton (Logout)

UserDetailContainer
└── UserDetailScreen
    ├── Image (Avatar)
    ├── DetailRow (Name)
    ├── DetailRow (Email)
    ├── DetailRow (Phone)
    └── CustomButton (Edit)

AddEditUserContainer
└── AddEditUserScreen
    ├── CustomTextInput (First Name)
    ├── CustomTextInput (Last Name)
    ├── CustomTextInput (Email)
    ├── CustomTextInput (Phone)
    └── CustomButton (Save)
```

## State Management Architecture

```
Zustand Store
├── AuthenticationStore
│   ├── State
│   │   ├── isAuthenticated: boolean
│   │   └── email: string | null
│   │
│   └── Actions
│       ├── login(email, password)
│       └── logout()
│
└── UsersStore
    ├── State
    │   ├── users: User[]
    │   ├── selectedUser: User | null
    │   ├── currentPage: number
    │   ├── isLoading: boolean
    │   ├── hasMoreUsers: boolean
    │   └── totalUsers: number
    │
    └── Actions
        ├── setUsers(users)
        ├── addUsers(users)
        ├── setSelectedUser(user)
        ├── setCurrentPage(page)
        ├── setIsLoading(loading)
        ├── setHasMoreUsers(hasMore)
        ├── setTotalUsers(total)
        ├── updateUser(user)
        ├── addUser(user)
        └── resetUsers()
```

## API Integration

```
Container (useEffect)
    ↓
apiService.getUsers(limit, skip)
    ↓
axios.get('/users', { params: { limit, skip } })
    ↓
DummyJSON API
    ↓
Response Data
    ↓
Store Update (setUsers/addUsers)
    ↓
Component Re-render
    ↓
UI Shows Users
```

## File Organization

```
src/
├── components/              ← Pure UI, no logic
│   ├── authentication/
│   │   └── signIn/
│   │       └── index.tsx
│   └── users/
│       ├── userList/
│       ├── userDetail/
│       └── addEditUser/
│
├── containers/              ← Business logic, API calls
│   ├── authentication/
│   │   └── signIn/
│   │       └── index.tsx
│   └── users/
│       ├── userList/
│       ├── userDetail/
│       └── addEditUser/
│
├── navigation/              ← React Navigation setup
│   └── index.tsx
│
├── store/                   ← Zustand state management
│   ├── authenticationStore.ts
│   └── usersStore.ts
│
├── services/                ← External API calls
│   └── apiService.ts
│
├── global/                  ← Reusable UI components
│   ├── customTextInput/
│   └── customButton/
│
├── constants/               ← App constants
│   ├── colors.ts
│   ├── styles.ts
│   └── screenNames.ts
│
└── utils/                   ← Helper functions
    └── validation.ts
```

## Pagination Flow

```
User List Container
    ↓
Initialize Page 0
    ↓
Fetch Users (skip=0, limit=10)
    ↓
Display in List
    ↓
User Scrolls Down
    ↓
onEndReached Triggered
    ↓
Fetch Next Page (skip=10, limit=10)
    ↓
Append to Existing List
    ↓
Show Activity Indicator
    ↓
Update List
    ↓
Repeat Until hasMoreUsers=false
```

## Validation Flow

```
User Input
    ↓
On Field Change
    ↓
Validate Function Called
    ├─→ validateEmail()
    ├─→ validatePassword()
    ├─→ validateFirstName()
    ├─→ validateLastName()
    └─→ validatePhone()
    ↓
Return true/false
    ↓
Get Error Message
├─→ getEmailErrorMessage()
├─→ getPasswordErrorMessage()
└─→ getFirstNameErrorMessage()
    ↓
Set Error State
    ↓
Component Re-render
    ↓
Show Error Text Below Input
```

## Authentication Flow

```
App Start
    ↓
Check isAuthenticated (Zustand)
    ↓
Route to Appropriate Screen
├─→ false: SignInScreen
└─→ true: UserListScreen
    ↓
User Enters Credentials
    ↓
Validate Input
    ↓
Valid?
├─→ No: Show Error Messages
│
└─→ Yes: Call login()
    ↓
Update Store (isAuthenticated=true)
    ↓
Automatically Navigate to UserList
    ↓
Logout Button Pressed
    ↓
Call logout()
    ↓
Reset Store & Navigation
    ↓
Return to SignIn
```

## Component Lifecycle

```
Container Mount
    ↓
useEffect (Initialize)
    ├─→ Fetch API Data
    ├─→ Update Store
    └─→ Handle Errors
    ↓
Component Receives Props
    ↓
User Interaction
    ├─→ Button Press
    ├─→ Scroll
    ├─→ Text Input
    └─→ Navigation
    ↓
Container Updates State
    ↓
Component Re-render
    ↓
UI Updated
```

## Type Safety Flow

```
Route Definition (screenNames.ts)
    ↓
RootStackParamList
    ↓
RootStackScreenProps<ScreenName>
    ↓
Container Type Annotations
    ↓
Component Prop Interface
    ↓
TypeScript Compiler Checks
    ↓
✅ Type-safe code
```

## Error Handling Flow

```
API Call or Operation
    ↓
Try Block
    ↓
Success?
├─→ Yes: Process Response
│        ↓
│    Update Store
│        ↓
│    Component Re-render
│
└─→ No: Catch Error
         ↓
     Handle Error
         ↓
     Set Error State
         ↓
     Show Error Message/Alert
         ↓
     Log Error (Development)
```

---

This visual representation helps understand:
- How components communicate
- Data flow through the app
- State management with Zustand
- Navigation structure
- API integration pattern
- Validation process
- Authentication flow
- File organization rationale

For more details, see the respective markdown files in the project root.

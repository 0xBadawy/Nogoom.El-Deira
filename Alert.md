
# Alert Usage in React Project

This document explains the implementation of an alert system using `react-confirm-alert` and `react-hot-toast`.

## Imports

Import the necessary libraries for alerts and toasts:

```javascript
import { confirmAlert } from "react-confirm-alert";
import toast, { Toaster } from "react-hot-toast";
```

## Alert Implementation

### State Management

Define state variables for controlling the alert dialog:

```javascript

const [isDialogOpen, setIsDialogOpen] = useState(false);
const handleDeleteUser = (user) => {
  setIsDialogOpen(true); // Open the dialog
};

// Confirming Deletion
const confirmDelete = () => {
  deleteUserFromDB(selectedUser); // Perform the deletion
  setSelectedUser(null);
  sortData(); // Refresh data
  toast.success("تم حذف الموظف بنجاح");
  setIsDialogOpen(false); // Close the dialog
};

// Cancelling Deletion
const cancelDelete = () => {
  toast.error("تم إلغاء العملية");
  setIsDialogOpen(false); // Close the dialog
};
```

### Button Component

Add a button to trigger the deletion process:

```javascript
<button
  className="bg-red-500 text-white px-4 py-2 rounded-lg"
  onClick={() => handleDeleteUser(selectedUser)}
>
  حذف المستخدم
</button>

<ConfirmDialog
  title="تأكيد الحذف"
  message="هل متأكد من حذف هذا المستخدم؟"
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)} // Close the dialog
  onConfirm={confirmDelete} // On confirm action
  onCancel={cancelDelete} // On cancel action
/>
```

## Toast Notifications


```javascript
<Toaster position="top-center" reverseOrder={false} />
```

## Dependencies

- `react-confirm-alert`: For creating custom confirm dialogs.
- `react-hot-toast`: For displaying success and error messages.


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
const [selectedItem, setSelectedItem] = useState(null); 

const handleConfirmAction = (item) => {
  setSelectedItem(item); // Set the item for confirmation
  setIsDialogOpen(true); // Open the dialog
};

// Confirming the Action
const confirmAction = (actionCallback, refreshCallback, successMessage) => {
  if (selectedItem) {
    actionCallback(selectedItem); // Perform the confirmed action
    setSelectedItem(null); // Clear the selected item
    if (refreshCallback) refreshCallback(); // Refresh data if provided
    toast.success(successMessage || "تم التأكيد بنجاح"); // Show success message
  }
  setIsDialogOpen(false); // Close the dialog
};

// Cancelling the Action
const cancelAction = (cancelMessage) => {
  if (cancelMessage) toast.error(cancelMessage);
  setIsDialogOpen(false); // Close the dialog
}
```

### Button Component

Add a button to trigger the deletion process:

```javascript
<button
  className="bg-red-500 text-white px-4 py-2 rounded-lg"
  onClick={() => handleConfirmAction(selectedUser)}
>
  تأكيد العملية
</button>

<ConfirmDialog
  title="تأكيد العملية"
  message="هل أنت متأكد من تنفيذ هذه العملية؟"
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)} // Close the dialog
  onConfirm={() =>
    confirmAction(
      deleteUserFromDB, // Replace with the actual callback for the action
      sortData, // Replace with refresh callback, if needed
      "تمت العملية بنجاح"
    )
  }
  onCancel={() => cancelAction("تم إلغاء العملية")}
/>

```

## Toast Notifications


```javascript
<Toaster position="top-center" reverseOrder={false} />
```

## Dependencies

- `react-confirm-alert`: For creating custom confirm dialogs.
- `react-hot-toast`: For displaying success and error messages.

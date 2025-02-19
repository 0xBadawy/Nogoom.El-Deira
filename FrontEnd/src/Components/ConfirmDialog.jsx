import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

const VisuallyHidden = ({ children }) => {
  return (
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        background:"white",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </span>
  );
};

const ConfirmDialog = ({
  title = "تأكيد العملية",
  message = "هل أنت متأكد من الاستمرار؟",
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="bg-white">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>

            <p>{message}</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={onCancel}>
              إلغاء
            </Button>
            <Button className="text-white" onClick={onConfirm}>نعم</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;

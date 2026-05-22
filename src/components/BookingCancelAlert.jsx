"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

export function BookingCancelAlert({ bookingId }) {
  const handleCancelBooking = async () => {
    try {
      const res = await fetch(`/http://localhost:5000/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking. Please try again.");
      }

      toast.success("Booking cancelled successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          className="rounded-xl border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 hover:border-red-400"
          variant="outline"
        >
          <TrashBin className="h-4 w-4" />
          Cancel
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-neutral-400">
                This action cannot be undone. Your booking slot will be released.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                onClick={handleCancelBooking}
                variant="danger"
                className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Yes, Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
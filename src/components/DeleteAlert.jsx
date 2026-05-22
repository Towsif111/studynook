"use client";

import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";



export function DeleteAlert({room}) {
  const {_id, roomName} = room;

   const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/room/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete room: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      window.location.href = '/rooms';
    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  return (
    <AlertDialog>
      <Button variant="danger"><TrashBin/>Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{roomName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
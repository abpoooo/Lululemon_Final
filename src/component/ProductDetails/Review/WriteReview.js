import * as React from 'react';
import {useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {ReviewForm} from "./ReviewForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: "#fafafa",
    border: 'none',
    borderRadius: '4px',
    boxShadow: 24,
}

export default function WriteReview() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Button onClick={handleOpen}>WRITE A REVIEW</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ReviewForm handleClose={handleClose}/>
                </Box>
            </Modal>
        </>
    )
}

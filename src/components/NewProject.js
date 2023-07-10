"use client"

import { useState, useEffect } from "react";
import { Modal } from "./Modal";

export function NewProject() {
    const [isOpen, setIsOpen] = useState(false)
    const [checkCondition, setCheckCondition] = useState(true)
    useEffect(() => {
        if (checkCondition) {
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      }, [checkCondition])
    return(
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStatic={checkCondition} title={"First Project Create"}>
            Deneme
        </Modal>
    )
}
"use client"

import { useState } from "react"

export function Grid({ children }) {
  const gridStructures = [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
  ]

  const [gridStructure, setGridStructure] = useState(gridStructures[0])

  const selectGridStructure = (event) => {
    setGridStructure(event.target.value)
  }

  return (
    <div>
      <label for="grid-structure">Select Your Structure: </label>
      <select id="grid-structure" onChange={selectGridStructure}>
        {gridStructures.map((structure, index) => (
          <option key={index} value={structure}>
            {structure}
          </option>
        ))}
      </select>
      <div className={`${gridStructure} row-span-5`}>{children}</div>
    </div>
  )
}

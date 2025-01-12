'use client'

import React from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { Button } from '../components/button'

type View = "Grid" | "List"

interface ListingsViewToggleProps {
    view: View
    onViewChange: (view: View) => void
    iconSize?: string
}

export function ListingsViewToggle({
    view,
    onViewChange,
    iconSize = "h-4 w-4"
}: ListingsViewToggleProps) {

    const isGrid = view === "Grid";

    return (
        <Button
            className='transition-all duration-200'
            variant={"outline"}
            size="icon"
            onClick={() => onViewChange(isGrid ? "List" : "Grid")}>
            {isGrid ? (
                <List className={iconSize} />
            ) : (
            <LayoutGrid className={iconSize} />
            )}
        </Button>
    );
}

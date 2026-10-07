import { SearchIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

export function SearchBar() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}

// import { SearchIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { ButtonGroup } from "@/components/ui/button-group"
// import { Input } from "@/components/ui/input"

// export function SearchBar() {
//   return (
//     <ButtonGroup>
//       <Input placeholder="Search..." />
//       <Button variant="outline" aria-label="Search">
//         <SearchIcon />
//       </Button>
//     </ButtonGroup>
//   )
// }

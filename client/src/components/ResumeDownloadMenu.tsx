import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

interface ResumeDownloadMenuProps {
  className?: string;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "ghost";
}

export default function ResumeDownloadMenu({ 
  className = "", 
  buttonText = "Download CV",
  buttonVariant = "default"
}: ResumeDownloadMenuProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={buttonVariant}
          className={`rounded-full flex items-center ${className}`}
        >
          {buttonText} <Download className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a 
            href="/Veronica_Vignoni_Product_Manager.pdf" 
            download="Veronica_Vignoni_Product_Manager.pdf"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Product Manager CV
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href="/Veronica_Vignoni_UX_UI_Designer.pdf" 
            download="Veronica_Vignoni_UX_UI_Designer.pdf"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            UX/UI Designer CV
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
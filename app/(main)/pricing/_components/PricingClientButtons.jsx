"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { User, Phone } from "lucide-react";

export function ChoosePlanButton({ planName }) {
  const { isSignedIn } = useUser();

  const handleChoosePlan = () => {
    // Implement logic for choosing a plan, perhaps redirecting to contact or checkout
    const message = `Hello, I am interested in the ${planName} plan for my listing.`;
    const whatsappUrl = `https://wa.me/917498444684?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (isSignedIn) {
    return (
      <Button onClick={handleChoosePlan} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
        Choose plan
      </Button>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
        <User className="w-4 h-4 mr-2" /> Login to Choose
      </Button>
    </SignInButton>
  );
}

export function ContactAdminButton() {
  const { isSignedIn } = useUser();

  const handleContact = () => {
    const message = `Hello, I would like to discuss custom enterprise/seasonal promotions for my listings.`;
    const whatsappUrl = `https://wa.me/917498444684?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (isSignedIn) {
    return (
      <Button onClick={handleContact} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold">
        <Phone className="w-4 h-4 mr-2" /> Contact admin team
      </Button>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button type="button" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold">
        <User className="w-4 h-4 mr-2" /> Login to Contact
      </Button>
    </SignInButton>
  );
}

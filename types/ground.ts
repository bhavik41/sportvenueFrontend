export interface Ground {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  groundType:
    | "box_cricket"
    | "pickle_ball"
    | "football"
    | "badminton"
    | "tennis"
    | "basketball"
    | "other";
  amenities: string[];
  images: string[];
  slots?: TimeSlot[];
  basePrice: number;
  offers?: Offer[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  adminId?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isAvailable: boolean;
  days: (
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"
  )[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  applicableSlots?: string[];
  couponCode?: string;
}

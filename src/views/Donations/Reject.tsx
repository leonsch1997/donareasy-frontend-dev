import { RejectDonation as RejectDonationMain } from "../../components/Institution/components/DonationReject";
import { RejectDonationViewProps } from "./types";

export const RejectDonation: React.FC = (props: RejectDonationViewProps) => (
  <RejectDonationMain {...props} />
);

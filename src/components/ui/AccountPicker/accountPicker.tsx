import dynamic from "next/dynamic";
import AccountPickerPlaceholder from "./accountPickerPlaceholder";

const AccountPicker = dynamic(() => import("./accountPickerClient"), {
  ssr: false,
  loading: () => <AccountPickerPlaceholder />
});

export default AccountPicker

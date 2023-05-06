import { getServerSession } from "next-auth/next";
import UserInformation from "@/dom/organ/auth/UserInformation";


export default async function AppServerDesc() {
    const session:any = await getServerSession();
    // console.log("Hello from server");
    return (<>
        <div>
            <div>This is the application description component (server component).</div>
            <UserInformation data={session.user} />
        </div>
    </>);
}
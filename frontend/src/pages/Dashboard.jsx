import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balances"
import { Users } from "../components/UsersComponent"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}
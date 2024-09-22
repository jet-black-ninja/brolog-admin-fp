import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import "./UserInfo.scss";

export default function UserInfo() {
    const {user} = useContext(AuthContext);
    const parsed = JSON.parse(JSON.stringify(user));
    return <div className="userinfo-container">{`Welcome ,${parsed.user.username}!`}</div>;
}
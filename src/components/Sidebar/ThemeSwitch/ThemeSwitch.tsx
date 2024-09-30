import {useContext} from "react";
import ThemeContext from "../../../contexts/ThemeContext";
import { ThemeType } from "../../../interfaces/customTypes";
import "./ThemeSwitch.scss";

export default function ThemeSwitch() {
    const {theme, setTheme} = useContext(ThemeContext);
    const themes = ['Default', 'Matte', 'Dark', 'Bright', 'Chameleon'];
    const currentIndex = themes.indexOf(theme as ThemeType);
    const nextIndex = (currentIndex + 1) % themes.length;

    const handleClick = () => {
        setTheme(themes[nextIndex] as ThemeType);
        localStorage.setTheme('theme', themes[nextIndex]);
    };

    return (
        <div className ="theme-switch">
            <button className = "theme_switch-button" onClick={handleClick} aria-label = "Toggle Theme" >
                Theme : {theme}
            </button>
        </div>
    )
}
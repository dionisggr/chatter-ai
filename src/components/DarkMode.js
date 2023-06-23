import useDarkMode from '../hooks/useDarkMode';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

/**
 * A toggle for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - Whether the sidebar is open or not.
 */
const DarkMode = (props) => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  /**
   * Toggles the dark mode.
   */
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
      <button onClick={handleMode} className={props.className || ''}>
        {darkTheme ? (
          <>
            <div>
            <MdOutlineWbSunny size={20} />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Light mode</h1>
          </>
        ) : (
          <>
            <div>
              <MdOutlineNightlight size={20} />
            </div>
            <h1 className={`${!props.open && "hidden"}`}>Dark Mode</h1>
          </>
        )}

      </button>
  )
}

export default DarkMode;
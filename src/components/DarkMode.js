import useDarkMode from '../hooks/useDarkMode';
import { MdOutlineNightlight, MdOutlineWbSunny } from 'react-icons/md';

const DarkMode = ({ className, isOpen }) => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => setDarkTheme(!darkTheme);
  return (
      <button onClick={handleMode} className={className || ''}>
        {darkTheme ? (
          <>
            <div>
            <MdOutlineWbSunny size={20} />
            </div>
            <h1 className={`${!isOpen && "hidden"}`}>Light mode</h1>
          </>
        ) : (
          <>
            <div>
              <MdOutlineNightlight size={20} />
            </div>
            <h1 className={`${!isOpen && "hidden"}`}>Dark Mode</h1>
          </>
        )}

      </button>
  )
}

export default DarkMode;
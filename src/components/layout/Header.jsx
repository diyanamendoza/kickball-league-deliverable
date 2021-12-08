import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/teams" exact>
                Teams
              </NavLink>
            </li>
            <li>
              <NavLink to="/players" exact>
                Players
              </NavLink>
            </li>
          </ul>
        </nav> 
\            <img alt='kickball on grass' src='./kickball-footer.png' />
        </header>
    )
}

import { useAuthStore } from "../../hooks"

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp; {/*  Separacion codificada que significa non-breaking space */}
            { user.name }
        </span>

        <button 
          className="btn btn-outline-danger"
          onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>

    </div>
  )
}

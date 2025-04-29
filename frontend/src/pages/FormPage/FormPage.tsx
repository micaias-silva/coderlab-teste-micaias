import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"
import "./style.css"

const FormPage = ({children}: PropsWithChildren) => {
    return <main className="form-page">
        <Link to="/">Go back</Link>
        <div className="form-container">
            {children}
        </div>
    </main>
}

export default FormPage
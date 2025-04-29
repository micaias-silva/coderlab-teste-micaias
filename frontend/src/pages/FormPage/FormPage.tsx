import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

const FormPage = ({children}: PropsWithChildren) => {
    return <main>
        <Link to="/">Go back</Link>
        <div className="form-container">
            {children}
        </div>
    </main>
}

export default FormPage
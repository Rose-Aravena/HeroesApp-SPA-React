import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../src/auth/context/AuthContext"
import { PublicRouter } from "../../src/router/PublicRouter"

describe('Pruebas en <PublicRoute />', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRouter>
                    <h1>Ruta publica</h1>
                </PublicRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta publica')).toBeTruthy();

    })

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Maria',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRouter>
                                <h1>Ruta publica</h1>
                            </PublicRouter>
                        } />
                        <Route path="marvel" element={<h1>Pagina Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    })

})
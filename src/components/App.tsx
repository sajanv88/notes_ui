import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import CreateAccount from './CreateAccount/CreateAccount';
import Layout from './Layout/Layout';
import StickyNotes from './StickyNotes/StickyNotes';
import useStore from '../hooks/useStore';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import AccountSettings from '../components/AccountSettings/AccountSettings';

function App() {
    const { state } = useStore();
    const isLoggedIn = state?.isLoggedIn;
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {!isLoggedIn && (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Layout>
                                        <Login />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/sign_in"
                                element={
                                    <Layout>
                                        <Login />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/sign_up"
                                element={
                                    <Layout>
                                        <CreateAccount />
                                    </Layout>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <Layout>
                                        <Login />
                                    </Layout>
                                }
                            />
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Route
                                path="/"
                                element={
                                    <Layout>
                                        <StickyNotes />
                                    </Layout>
                                }
                            ></Route>

                            <Route
                                path="/account_settings"
                                element={
                                    <Layout>
                                        <AccountSettings />
                                    </Layout>
                                }
                            />
                            <Route
                                path="*"
                                element={
                                    <Layout>
                                        <PageNotFound />
                                    </Layout>
                                }
                            />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

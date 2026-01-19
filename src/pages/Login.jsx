import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit">로그인</button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    계정이 없으신가요? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>회원가입</Link>
                </p>
            </div>
        </div>
    );
}

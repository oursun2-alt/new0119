import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestore에 사용자 정보 저장
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: role,
                name: name,
                createdAt: new Date().toISOString()
            });

            navigate("/");
        } catch (err) {
            setError("회원가입에 실패했습니다: " + err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card">
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>이름</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="input-group">
                        <label>가입 유형</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">학생 🎒</option>
                            <option value="teacher">교사 👩‍🏫</option>
                        </select>
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit">계정 생성</button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    이미 계정이 있으신가요? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>로그인</Link>
                </p>
            </div>
        </div>
    );
}

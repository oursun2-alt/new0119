import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { LogOut, Home, ClipboardList, User, Heart } from "lucide-react";

export default function Navbar() {
    const { currentUser, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav>
            <div className="logo">
                4학년 1반 가족 여러분 사랑합니다
                <Heart size={18} className="heart" fill="#ef4444" />
                <Heart size={18} className="heart" fill="#ef4444" />
                <Heart size={18} className="heart" fill="#ef4444" />
            </div>
            <div className="nav-links">
                <Link to="/"><Home size={18} /> 홈</Link>
                {currentUser && (
                    <Link to="/board"><ClipboardList size={18} /> 알림장</Link>
                )}
                <div style={{ marginLeft: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {currentUser ? (
                        <>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                                <User size={14} /> {role === 'teacher' ? '선생님' : '학생'}
                            </span>
                            <button onClick={handleLogout} className="btn-secondary" style={{ width: 'auto', padding: '0.4rem 0.8rem', marginTop: 0, fontSize: '0.85rem' }}>
                                <LogOut size={14} /> 로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">로그인</Link>
                            <Link to="/signup" style={{ background: '#f97316', padding: '0.4rem 0.8rem', borderRadius: '8px', color: 'white' }}>회원가입</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

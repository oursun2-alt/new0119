import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ClipboardList, Users, Utensils, Sparkles, Sun } from "lucide-react";

export default function Home() {
    const { currentUser } = useAuth();

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="home-bg-wrapper"></div>
            <div className="home-overlay"></div>

            <section className="hero-section">
                <div style={{ display: 'inline-block', padding: '0.6rem 1.5rem', background: 'rgba(255, 255, 255, 0.9)', color: '#f97316', borderRadius: '99px', fontWeight: '900', fontSize: '1rem', marginBottom: '1.5rem', border: '3px solid #fed7aa', boxShadow: '0 4px 15px rgba(249, 115, 22, 0.1)' }}>
                    <Sun size={18} style={{ verticalAlign: 'middle', marginRight: '6px', color: '#fbbf24' }} />
                    햇살 가득한 우리들의 따뜻한 교실
                </div>
                <h1>4학년 1반 홈페이지</h1>
                <p style={{ marginTop: '0.5rem' }}>
                    친구들과 선생님의 사랑이 넘치는 행복한 공간이에요!
                </p>
            </section>

            <div className="main-cards-grid">
                <Link to="/board" className="info-card">
                    <div className="icon-box" style={{ background: '#ffedd5', width: '80px', height: '80px' }}>
                        <ClipboardList size={40} color="#f97316" />
                    </div>
                    <h3>우리 반 알림장</h3>
                    <p>선생님께서 전해주시는 <br />중요한 소식을 확인해요.</p>
                </Link>

                <Link to="/friends" className="info-card">
                    <div className="icon-box" style={{ background: '#fef3c7', width: '80px', height: '80px' }}>
                        <Users size={40} color="#d97706" />
                    </div>
                    <h3>우리 반 친구들</h3>
                    <p>사랑하는 우리 반 친구들의 <br />멋진 소개를 만나보세요.</p>
                </Link>

                <Link to="/meals" className="info-card">
                    <div className="icon-box" style={{ background: '#ffeadb', width: '80px', height: '80px' }}>
                        <Utensils size={40} color="#ea580c" />
                    </div>
                    <h3>이번 달 식단</h3>
                    <p>맛있고 영양 가득한 <br />오늘의 급식을 기대해요!</p>
                </Link>
            </div>

            <div style={{ flex: 1 }}></div>
        </div>
    );
}

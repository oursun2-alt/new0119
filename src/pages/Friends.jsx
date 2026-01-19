import React from "react";
import { Users as UsersIcon, User } from "lucide-react";

const friendsList = [
    { id: 1, name: "김민수", intro: "축구를 좋아하는 씩씩한 친구" },
    { id: 2, name: "이서연", intro: "그림 그리기를 잘하는 친절한 친구" },
    { id: 3, name: "박준호", intro: "공룡 박사님! 책 읽기를 좋아해요" },
    { id: 4, name: "최지우", intro: "피아노 연주가 특기인 명랑한 친구" },
    { id: 5, name: "정다은", intro: "동물을 사랑하는 마음 따뜻한 친구" },
    { id: 6, name: "한지훈", intro: "달리기가 정말 빠른 우리반 육상선수" },
];

export default function Friends() {
    return (
        <div className="board-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div className="icon-box" style={{ background: '#fef3c7' }}>
                    <UsersIcon size={32} color="#d97706" />
                </div>
                <h1>우리 반 친구들 소개 🌈</h1>
            </div>

            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>우리 반의 소중한 친구들을 한 명씩 소개합니다. 서로 돕고 응원하며 함께 활기찬 4학년을 만들어요!</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {friendsList.map(friend => (
                    <div key={friend.id} className="post-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
                        <div style={{ background: '#f8fafc', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e2e8f0' }}>
                            <User size={30} color="#64748b" />
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem', color: '#1e3a8a' }}>{friend.name}</h3>
                            <p style={{ fontSize: '0.85rem' }}>{friend.intro}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

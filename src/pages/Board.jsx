import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { PlusCircle, FileText, Calendar, User, Heart } from "lucide-react";

const januaryNotices = [
    { date: "1월 19일 (월)", title: "겨울 방학 중 건강 관리 유의", content: "추운 날씨에 감기 조심하고, 독감 예방 수칙을 잘 지켜주세요. 규칙적인 운동 잊지 마세요!" },
    { date: "1월 16일 (금)", title: "주말 독서 숙제 확인", content: "이번 주말에는 읽고 싶은 책 한 권을 정해서 읽고 줄거리를 짧게 적어오세요." },
    { date: "1월 15일 (목)", title: "수학 익힘 실습 준비", content: "내일 수학 시간에는 자와 컴퍼스가 필요합니다. 미리 챙겨주세요." },
    { date: "1월 14일 (수)", title: "급식 예절 지키기 캠페인", content: "식당에서 질서를 잘 지키는 4학년 1반 친구들이 됩시다. 잔반 줄이기에도 동참해요!" },
    { date: "1월 13일 (화)", title: "겨울철 빙판길 주의", content: "등하교 길에 길 위가 얼어 있을 수 있습니다. 주머니에 손을 넣지 말고 조심히 걸으세요." },
    { date: "1월 12일 (월)", title: "새로운 마음으로 월요일 시작", content: "이번 주도 친구들과 사이좋게 지내는 행복한 한 주 되길 바랍니다." },
    { date: "1월 9일 (금)", title: "교실 사물함 정리정돈", content: "한 주 동안 사용한 물건들을 사물함에 잘 정리하고 집으로 돌아가세요." },
    { date: "1월 8일 (목)", title: "국어 시간 발표 안내", content: "내일 국어 시간에는 자신이 좋아하는 계절에 대해 발표하는 시간을 가집니다." },
    { date: "1월 7일 (수)", title: "우유 급식 확인", content: "우유 급식을 신청한 친구들은 남기지 않고 다 마실 수 있도록 노력해요." },
    { date: "1월 6일 (화)", title: "체육 시간 운동복 지참", content: "내일 체육관 수업이 있습니다. 활동하기 편한 운동복을 입고 오세요." },
    { date: "1월 5일 (월)", title: "1월 첫 월요일 알림장", content: "새해 첫 월요일입니다! 모두 활기차게 등교한 모습이 보기 좋습니다." },
    { date: "1월 2일 (금)", title: "신년 목표 세우기", content: "올 한 해 동안 꼭 이루고 싶은 목표 한 가지씩 생각해서 다음 주에 발표해요." },
    { date: "1월 1일 (목)", title: "신정 공휴일 휴업", content: "신정을 맞아 학교를 쉬어갑니다. 가족들과 즐거운 시간 보내세요!" },
];

export default function Board() {
    const { currentUser, role, userData } = useAuth();
    const [posts, setPosts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const q = query(collection(db, "materials"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fbPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(fbPosts);
        });
        return unsubscribe;
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (role !== 'teacher') return;

        try {
            await addDoc(collection(db, "materials"), {
                title,
                content,
                author: userData?.name || currentUser.email,
                authorEmail: currentUser.email,
                timestamp: serverTimestamp()
            });
            setTitle("");
            setContent("");
            setShowAddForm(false);
        } catch (err) {
            console.error("Error adding doc", err);
        }
    };

    return (
        <div className="board-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    4학년 1반 알림장 📝 <Heart size={24} className="heart" fill="#ef4444" />
                </h1>
                {role === 'teacher' && (
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        style={{ width: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: 0 }}
                    >
                        <PlusCircle size={20} /> 새 알림장 쓰기
                    </button>
                )}
            </div>

            {showAddForm && (
                <div className="glass-card" style={{ maxWidth: '100%', marginBottom: '2rem', border: '4px solid #fed7aa' }}>
                    <h3>신규 알림장 작성</h3>
                    <form onSubmit={handleAddPost}>
                        <div className="input-group">
                            <label>제목</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>내용</label>
                            <textarea
                                rows="5"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit">등록하기</button>
                            <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">취소</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="posts-list">
                {/* 실시간 DB 데이터 렌더링 */}
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <div className="post-header">
                            <h2 style={{ color: '#c2410c' }}>{post.title}</h2>
                            <span className={`role-badge role-teacher`}>선생님 알림</span>
                        </div>
                        <p style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap', fontWeight: 500 }}>{post.content}</p>
                        <div className="post-meta">
                            <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                <User size={14} /> {post.author}
                            </span>
                            <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                <Calendar size={14} /> {post.timestamp?.toDate().toLocaleDateString() || '방금 전'}
                            </span>
                        </div>
                    </div>
                ))}

                {/* 1월 알림장 (정적 데이터) */}
                <h2 style={{ margin: '3rem 0 1.5rem', textAlign: 'center', color: '#64748b' }}>--- 1월 알림장 기록 ---</h2>
                {januaryNotices.map((notice, idx) => (
                    <div key={`jan-${idx}`} className="post-card" style={{ opacity: 0.8, background: '#fffcf0' }}>
                        <div className="post-header">
                            <h2 style={{ color: '#444' }}>{notice.title}</h2>
                            <span className="post-meta" style={{ background: '#e2e8f0', padding: '2px 10px', borderRadius: '10px' }}>{notice.date}</span>
                        </div>
                        <p style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{notice.content}</p>
                        <div className="post-meta">
                            <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                <User size={14} /> 담임 선생님
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

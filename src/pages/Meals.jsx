import React from "react";
import { Utensils } from "lucide-react";

const mealData = [
    { day: "월요일", menu: "차수수밥, 육개장, 돈육강정, 시금치나물, 배추김치", kcal: "650" },
    { day: "화요일", menu: "기장밥, 어묵국, 안동찜닭, 무생채, 깍두기", kcal: "620" },
    { day: "수요일", menu: "카레라이스, 가쓰오장국, 닭다리튀김, 오이소박이, 과일푸딩", kcal: "710" },
    { day: "목요일", menu: "현미밥, 된장찌개, 불고기, 잡채, 섞박지", kcal: "680" },
    { day: "금요일", menu: "오곡밥, 미역국, 생선구이, 콩나물무침, 총각김치", kcal: "640" },
];

export default function Meals() {
    return (
        <div className="board-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div className="icon-box" style={{ background: '#fce7f3' }}>
                    <Utensils size={32} color="#db2777" />
                </div>
                <h1>이번 달 식단표 🍱</h1>
            </div>

            <div className="glass-card" style={{ maxWidth: '100%' }}>
                <h3>오늘의 맛있는 급식</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>영양 만점! 골고루 먹고 씩씩하게 자라는 4학년 1반이 됩시다.</p>

                <table className="meal-table">
                    <thead>
                        <tr>
                            <th>요일</th>
                            <th>오늘의 메뉴</th>
                            <th>칼로리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mealData.map((item, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: 800, color: '#1e3a8a' }}>{item.day}</td>
                                <td style={{ textAlign: 'left' }}>{item.menu}</td>
                                <td style={{ color: '#059669', fontWeight: 700 }}>{item.kcal} kcal</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

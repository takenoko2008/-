        window.addEventListener('DOMContentLoaded', () => {
            const bgm = document.getElementById('bgm');
            bgm.volume = 1;

            // 再生を試す関数（最大5回リトライ）
            const tryPlay = async (retry = 0) => {
                try {
                    await bgm.play();
                    console.log("🎵 BGM再生成功");
                } catch (err) {
                    console.warn("⚠️ 再生失敗:", err);

                    if (retry < 5) {
                        console.log(`🔁 再試行 ${retry + 1} 回目…`);
                        setTimeout(() => tryPlay(retry + 1), 600);
                    } else {
                        console.error("❌ BGMが再生できませんでした");
                    }
                }
            };

            // 1秒遅れて再生開始
            setTimeout(() => tryPlay(), 1000);
        });
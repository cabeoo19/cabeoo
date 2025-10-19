// === Đợi DOM load xong ===
document.addEventListener("DOMContentLoaded", function () {
  // ===== ENVELOPE OPEN/CLOSE =====
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const closeLetter = document.getElementById("closeLetter");
  const flap = document.getElementById("flap");
  const floatingHearts = document.getElementById("floatingHearts");

  // Kiểm tra xem các elements có tồn tại không
  if (!envelope || !letter || !closeLetter) {
    console.error("Không tìm thấy các elements cần thiết!");
    return;
  }

  // Mở phong bì
  envelope.addEventListener("click", function (e) {
    // Không mở nếu click nút đóng
    if (e.target === closeLetter || closeLetter.contains(e.target)) {
      return;
    }

    envelope.classList.add("open");

    // Hiệu ứng trái tim bay
    if (floatingHearts) {
      floatingHearts.classList.add("active");
      setTimeout(() => {
        floatingHearts.classList.remove("active");
      }, 3000);
    }

    // Hiển thị thư sau khi phong bì mở
    setTimeout(() => {
      letter.classList.add("show");
    }, 400);
  });

  // Đóng thư
  closeLetter.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn mở lại phong bì khi click nút X
    letter.classList.remove("show");
    setTimeout(() => {
      envelope.classList.remove("open");
    }, 300);
  });

  // ===== FLIP CARD FUNCTIONALITY =====
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("click", function () {
      // Toggle lật thẻ
      this.classList.toggle("flipped");

      // Nếu card có video, xử lý phát/dừng
      if (video) {
        if (this.classList.contains("flipped")) {
          // Khi lật ra mặt sau
          video.currentTime = 0;
          video.muted = false;
          video
            .play()
            .catch((err) => console.log("⚠️ Trình duyệt chặn autoplay:", err));
        } else {
          // Khi úp lại
          video.pause();
        }
      }
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ===== ANIMATION ON SCROLL =====
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".flip-card, .message-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

  console.log("✅ Script loaded successfully!");
});

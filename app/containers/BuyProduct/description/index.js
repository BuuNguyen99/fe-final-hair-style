import React from 'react';

function Description() {
  return (
    <div className="description">
      <h2>Thiết kế nhỏ gọn của DJI Mini SE</h2>
      <p>
        DJI Mini SE là flycam nhỏ gọn với thiết kế gần giống như Mavic Mini.
        Flycam hướng đến người dùng ít kinh nghiệm và những người mới bắt đầu.
        Với trọng lượng dưới 250g, bạn có thể sử dụng flycam trong những khu vực
        mà các drone lớn không được phép hoạt động. Bên cạnh đó, kích thước nhỏ
        gọn và trọng lượng nhẹ của flycam cũng cho phép bạn có thể dễ dàng mang
        theo khi di chuyển.
      </p>
      <div className="description__image">
        <img
          src="https://dji-vietnam.vn/wp-content/uploads/2021/06/DJI-Mini-SE.jpeg"
          alt=""
        />
      </div>

      <h2>Khả năng quay video 2.7K</h2>
      <p>
        DJI Mini SE trang bị cảm biến 1/2.3 độ phân giải 12MP có khả năng quay
        video 2.7K/30fps và chụp ảnh tĩnh 12MP. Khả năng quay video của flycam
        được đánh giá là vượt trội hơn so với kích thước nhỏ gọn của nó với chất
        lượng hình ảnh rõ ràng và sắc nét. Gimbal 3 trục được tích hợp trên DJI
        Mini SE giúp ổn định hình ảnh, đem đến những cảnh quay mượt mà, hạn chế
        tối đa sự rung lắc trong quá trình sử dụng.
      </p>
      <div className="description__image">
        <img
          src="https://dji-vietnam.vn/wp-content/uploads/2020/12/mavic-mini-3-768x591.jpg"
          alt=""
        />
      </div>

      <h2>Chế độ bay thông minh</h2>
      <p>
        Flycam DJI Mavic Mini SE trang bị chế độ bay thông minh là Quickshot.
        Chế độ này bao gồm Dronie, Rocket, Circle và Helix mang đến cho người
        dùng trải nghiệm bay ấn tượng. Với các chế độ bay đa dạng, bạn có thể dễ
        dàng tạo ra những cảnh quay ấn tượng mà không cần nhiều kinh nghiệm hay
        các kỹ thuật bay phức tạp.
      </p>
      <div className="description__image">
        <img
          src="https://dji-vietnam.vn/wp-content/uploads/2020/09/mavic-mini-mobile-4.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Description;

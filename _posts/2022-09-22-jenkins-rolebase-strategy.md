---
layout: post
title: "Phân quyền Jenkins Rolebase Strategy sử dụng API"
featured-img: sleek
categories: [Jenkins, Jenkins]
---

### **Giới thiệu**
Trong Jenkins, giải pháp phân quyền sử dụng nhiều nhaats đấy là **Role-based Authorization Strategy**

Tuy nhiên, nó có 1 vài hạn chế khi sử dụng, khi dự án bắt đầu to dần ra, khi nhân sự tính đến hàng trăm, doanh nghiệp cần chia nhỏ từng bộ phận và lúc đấy Web load giao diện rất chậm. Vì vậy trong bài viết này, mình sẽ sử dụng giải pháp để phân quyền nó, đấy là sử dụng API. Nào, giờ thì gét gô :3

Để cài được plugin này, các bác có thể follow bài viết này của bác Trịnh Quốc Việt Nhé [Phân quyền Jenkins](https://viblo.asia/p/k8s-phan-18-phan-quyen-su-dung-jenkins-cho-nhieu-moi-truong-bXP4W5MoL7G)

### **Vấn đề thực trạng khi sử dụng**
Trong đưa giải pháp này đi vào sử dụng, mình gặp 1 cái khó khăn trong quá trình sử dụng trình duyệt, bởi vì web nó load rất lâu :))). Lý do thì mình sẽ giải thích ở đây:
1. Web được thiết kế giao diện theo kiểu ma trận
2. User ban đầu load lên sẽ là tên account đăng nhập Jenkins, nhưng sau đấy nó sẽ gọi 1 đầu API để check xem user đó có đúng trên hệ thống không, check từng user 1 => user càng nhiều load web càng lâu
3. Khi sử dụng, rất khó định hình user với role tương ứng, vì mình không có cột mốc để đánh dấu
Lúc đấy vì phần phân quyền mà mình đã phải tốn 10-20 phút để phân  1 role cho 1 user, bởi vì bị web bị trôi =))
Từ đó, mình mới bắt đầu nghiên cứu cách sử dụng khác của plugin này, đấy là sử dụng API

### **API**
Document tham khảo mình lấy ở đây: [Jenkins Doc](https://javadoc.jenkins.io/plugin/role-strategy/com/michelin/cio/hudson/plugins/rolestrategy/RoleBasedAuthorizationStrategy.html)
Hơi lằng nhằng phải không :)))). Ban đầu mình thấy cũng ngợp, nhưng sau đấy mình chỉ quan tâm tới các đầu API có lệnh curl :)), các bạn search chữ curl ra là sẽ thấy.
Mình sẽ giới thiệu qua các đầu API mình hay sử dụng
1. Get All Roles: 
Lệnh: 
```sh
curl -X GET localhost:8080/role-strategy/strategy/getAllRoles?type={RoleType}
```
Lưu ý :
* RoleType ở đây chính là các role lớn như: globalRoles, projectRoles, nodeRoles.
* Các bạn có thể thay địa chỉ <localhost:8080> thành Jenkins link
```sh
   {
     "role2": ["user1", "user2"],
     "role2": ["group1", "user2"]
   }

```
Role này có tác dụng giúp bạn check user đã được phân quyền thành công hay chưa
2. Assign Role:
Lệnh: 
```sh
curl -X POST localhost:8080/role-strategy/strategy/assignRole --data "type=globalRoles&amp;roleName=ADM &amp;sid=username"
```
Ở đây, có 3 tham số cần để ý ở đây là:
* type: RoleType, là các role lớn, mình vừa đề cập ở lệnh trên
* roleName: tên role con trong các role lớn :3
* sid: là tên user cần gán quyền
Lệnh này phân Role nhanh chỉ trong 1 cái enter :))
3. Unassign Role:
Lệnh: 
```sh
curl -X POST localhost:8080/role-strategy/strategy/doUnassignRole --data "type=globalRoles&amp;roleName=ADM &amp;sid=username"
```
Ở đây, có 3 tham số cần để ý ở đây là:
* type: RoleType, là các role lớn, mình vừa đề cập ở lệnh trên
* roleName: tên role con trong các role lớn :3
* sid: là tên user cần gán quyền
Lệnh này sử dụng để bỏ user ra khỏi Role

Trên đây mình giới thiệu 1 vài role mình hay sử dụng

Thật ra khi có đầu API gọi rồi, mình có thể sử dụng curl, postman, hoặc như mình sẽ tạo các job jenkins có các parameter mong muốn, sau đấy click chuột 1 phát là xong :))

Bài này mình giới thiệu tới đây thôi, còn tuỳ vào tình hình thực tế trong doanh nghiệp, mình sẽ tạo ra các tool riêng dành cho riêng mình

Xin cảm ơn các bạn đã theo dõi :>

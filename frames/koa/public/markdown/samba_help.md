# 局域网文件共享简易教程

- [Mac](#mac)
  - [Step 1: 打开 Finder](#step-1-打开-finder)
  - [Step 2: 连接到共享服务器](#step-2-连接到共享服务器)
- [Windows](#windows)
  - [Step 1: 打开资源管理器](#step-1-打开资源管理器)
  - [Step 2: 添加收藏夹](#step-2-添加收藏夹)

## 简介

考虑到公司各部门文件共享不便，RD 部门倾情为大家奉上**简单易用**的``局域网文件共享服务``。

今后各位连接到文件共享服务器后，无论 Mac 还是 Windows，都可以顺着这座桥梁，像管理自己的文件夹一样，轻松地浏览他人分享的文件，亦可共享自己的资源。

![sample](/images/samba/sample.png)

**注意！**
>文件共享服务只能在公司内网访问哦~

## Mac

### Step 1: 打开 Finder

``菜单栏`` → ``前往`` → ``连接服务器`` 或者直接使用快捷键 ``⌘ + K`` 打开连接服务器窗口。

![connect-to-server](/images/samba/step1-1.png)

### Step 2: 连接到共享服务器

在服务器地址栏输入地址 ``smb://192.168.10.15`` → ``连接``，出现加载框。

![connect-to-server-dialog](/images/samba/step2-1.png)
 
![connect-to-server-loading](/images/samba/step2-loading.png)

等到连接到服务器后，会弹出登录界面，勾选 ``注册用户``、``在我的钥匙串中记住此密码``，然后 ``输入用户名: smbuser 密码: smb@xish123`` → ``连接``

![connecting](/images/samba/step2-2.png)

待连接完成后，Finder 会自动打开窗口，如下图所示。

**如果不慎关闭，可以在 Finder 左侧栏中【共享的】中挂载的远程主机中找到共享文件夹（192.168.10.15）。**

![sample](/images/samba/sample.png)

## Windows

### Step 1: 打开资源管理器

``在地址栏输入 \\192.168.10.15`` → ``确定``

![input-ip-address](/images/samba/win-step1-1.jpg)

等到连接到服务器后，会弹出登录界面，勾选 ``记住我的凭据``，然后 ``输入用户名: smbuser 密码: smb@xish123``

![input-user-password-and-username](/images/samba/win-step1-2.jpg)

连接成功后可以看到共享文件夹

![share-folder](/images/samba/win-step1-3.jpg)

![share-folder-details](/images/samba/win-step1-4.jpg)

### Step 2: 添加收藏夹

为了方便后续使用，可以将此文件夹收藏：``选中共享文件夹`` → ``拖拽到收藏夹``

![drag-to-favorites-bar](/images/samba/win-step2-1.jpg)
![share-folder-from-side-bar](/images/samba/win-step2-2.jpg)

[1]: mailto:ryan@xisue.com


    Kakao.init('e889fc1c305ac7a589982468b18591e8');
    Kakao.isInitialized();

    function kakaoLogin(){
      Kakao.Auth.login({
        success:function(response){
          Kakao.API.request({
            url: '/v2/user/me',
            success : function(response){
              console.log(response);
              var userMe = document.getElementById('user');
              userMe.innerHTML = response.kakao_account.profile.nickname;
            }
          });
        }
      });
    };


    function kakaoLogout() {
        if (Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
                url: '/v1/user/unlink',
                success : function(response){
                  console.log(response);
                  var userMe = document.getElementById('user');
                  userMe.innerHTML = "";
                  alert('로그아웃!');
                }
              });
              Kakao.Auth.setAccessToken(undefined);
            }
      }



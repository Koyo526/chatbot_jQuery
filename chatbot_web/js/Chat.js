// テキストエリアのサイズの自動リサイズ
$(function(){
    $('textarea.auto-resize')
    .on('change keyup keydown paste cut blur', function(){
        if ($(this).outerHeight() > this.scrollHeight){
            $(this).height(1)
        }
        while ($(this).outerHeight() < this.scrollHeight){
            $(this).height($(this).height() + 1)
        }
    });
});

$(function(){
    // Lv.3:①ボタンのidを指定しよう ➁クリックで反応するようにしよう
    $('#chat-btn').on("click", function(){
        console.log("click")
        // Lv.3,4が出来たら18行目の「//」を消してね
        chatAreaInputed();
        // Lv.5が出来たら20行目の「//」を消してね
        chatbotRequest();
        autoScrollChatArea();
        resetChatText();

        // テキストエリアのサイズを調整
        if (1 < $('textarea.auto-resize').outerHeight() ){
            $('textarea.auto-resize').height(11);
        }
    });
});

// チャットエリアに入力した内容を追加
function chatAreaInputed() {
    if ($('textarea[id="chat-text"]').val() != '') {
        // Lv.4:①テキストエリアに入力した内容を取得しよう
        var chatText = $(`textarea[id="chat-text"]`).val();
        chatText = chatText.replace(/\r?\n/g, '<br />');
        console.log(chatText)
        // Lv.4:➁ul要素に追加しよう Lv.4:➂取得した内容を表示するようにしよう
        $('ul').append(`<li class="user">`+chatText+`</li>`);
    }
}

function apiResponseInputed(text) {
    // Lv.6:ChatBotから返ってきた内容を表示しよう
    console.log(text)
    $('ul').append(`<li class="noby">`+text+`</li>`);
}

// チャットエリアに新しく追加した項目に自動スクロール
function autoScrollChatArea() {
    var chatContents = $('#chat-area').find('li');

    // 追加したチャットの高さを取得
    var offsetTop = chatContents[chatContents.length - 1].offsetTop;
    $('#chat-area').scrollTop(offsetTop);
}

// チャットテキストのリセット
function resetChatText() {
    var chatText = $('textarea[id="chat-text"]').val();
    chatText = '';
    chatText = chatText.replace(/\r?\n/g,'');
    $('textarea[id="chat-text"]').val(chatText);
}

// noby apiの実行
function chatbotRequest() {
    // Lv.5:①urlという変数に格納しよう
    const url = new URL('https://app.cotogoto.ai/webapi/noby.json');

    // Lv.5:➁getDataという変数に格納しよう Lv.5:➂テキストエリアに入力した内容を取得しよう
    const getData = {'appkey': '5b80aafbec70f108a2aa0bc3595782d0', 'text': $(`textarea[id="chat-text"]`).val()}
    console.log(getData)
    $.get(url, getData, (data)=>{
       apiResponseInputed(data.text);
       autoScrollChatArea();
   });


}

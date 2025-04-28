import { useState } from "react";
import PostComments from "./PostComments";
import PostContent from "./PostContent";
import postData from "../postData";

export default function DebatePost() {
  /* Challenge 

Form çalışmıyor. Göreviniz, kullanıcı "Gönder "e tıkladığında gönderiye bir yorum ekleyen kontrollü bir form yapmaktır.

    1. Yorum, yorum dizisinin alt kısmında, girilen kullanıcı adı ve yorum metni önceki yorumlar gibi görüntülenecek şekilde görünmelidir.  
       
    2. Yorum, önceki yorumların verilerini içeren array'e eklenmelidir. 
    
    3. Girilen kullanıcı adı kaydedilmeli, ancak kullanıcı onay kutusunu işaretlerse "AnonimKullanıcı" olarak görünmelidir.
    
    4. Kullanıcı formu göndermek için text input elemanına ve comment box elemanına metin girmek zorunda olmalı ve kullanıcı bir yorum gönderdikten sonra elemanlar ve onay kutusu temizlenmelidir. Sayfa yüklendiğinde de boş olmalıdırlar.   
        
    5. Kodunuz tamamen bu dosyanın içinde yer alabilir, ancak isterseniz bazı kısımları taşıyabilirsiniz. 

*/
  const [comments, setComments] = useState(postData.comments);
  const [textArea, setTextArea] = useState("");
  const [user, setUser] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!textArea.trim() || (!user.trim() && !anonymous)) {
      return; // Gerekli alanlar boşsa gönderme
    }

    const newComment = {
      id: crypto.randomUUID(), // Benzersiz id
      userName: anonymous ? "AnonimKullanıcı" : user.trim(),
      isAnonymous: anonymous,
      commentText: textArea.trim(),
    };

    setComments([...comments, newComment]);
    setTextArea("");
    setUser("");
    setAnonymous(false);
  };

  return (
    <div className="post-container">
      <PostContent data={{ ...postData }} />
      <PostComments data={comments} />
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          type="text"
          placeholder="Kullanıcı adı girin."
          value={user}
          onChange={(e) => setUser(e.target.value)}
          disabled={anonymous}
          required={!anonymous}
        />
        <textarea
          placeholder="Ne düşünüyorsunuz?"
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          required
        />
        <label>
          <input
            className="checkbox"
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          İsimsiz mi göndereyim?
        </label>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}

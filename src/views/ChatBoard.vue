<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="pt-16 px-6" fluid fixed-header height="300px">
        <v-col cols="12" sm="4" md="4" xl="3" class="py-0">
          <v-text-field v-model="setName" class="mx-10" :counter="20" label="名前"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-textarea  class="mx-2"  v-model="setMsg" label="なにかやらかした？" rows="1" prepend-icon="mdi-comment" auto-grow :counter="140"></v-textarea>
          <v-btn class="mr-4" type="submit" :disabled="invalid" v-bind:style="{background: btnTro }" @click="submit">とろ</v-btn>
          <v-btn blue lighten-4 class="mx-2" v-bind:style="{background: btnUpd}" @click="upBtn"><v-icon>mdi-cached</v-icon></v-btn>
        </v-col>
      </v-container>
      <v-container class="py-4 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12" fluid>
            <v-card>
              <v-banner class ='justify-center py-1'>{{ card }}</v-banner>
              <v-card-text>
                <template v-for="(data, indexId) in messages">
                    <div :key="indexId" value="indexId">
                      <div class="message py-2">
                        {{ data.uname }}：{{ data.date.toDate().toLocaleString()}}<br>{{ data.umsg }}
                        <h4 class= cadDmd>
                          <v-btn color="primary" fab plain raised x-small class="mx-1" v-bind:style="{background: btnDnm}" @click="donotMind(indexId,data.udomd)"><v-icon>mdi-thumb-up</v-icon></v-btn>
                          {{ data.udomd }}どんまい
                        </h4>
                      </div>
                    </div>
                  <v-divider :key="`divider-${indexId}`"></v-divider>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import {db, chatRef, chatSort} from "@/firebase/firebase"
import {doc, addDoc,updateDoc, Timestamp, onSnapshot} from "firebase/firestore"

  export default {
    
    data: () => ({
      messages:[],
      setId:[],
      setName: '',
      setMsg: '',
      setDnm:[],
      cards: ['ʔ-̫͡-ʔʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʕ~やさしい世界~ʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ'],
      btnTro:'dodgerblue',
      btnUpd:'',
      btnDnm:'',
      countRead: 0,
      countFirst:[],
      countUpd:[]
    }),

    created(){
      const disPlayMsg = this.messages
      const getId = this.setId
      const getDnm = this.setDnm
      const setCf = this.countFirst
      const setCu = this.countUpd
      let counter = this.countRead
        
        onSnapshot(chatSort,function(snapshot){   
          /*Firebaseからデータを取得し配列messagesに追加。
            Firebaseで追加されたデータも追加する。*/
          // 初期処理だけFirebaseか読み込むようにカウンターで制御
          if (counter == 0){
            snapshot.forEach(doc =>{
              disPlayMsg.push(doc.data())
              /* どんまいボタン更新用にIDを配列にセット。
                 初期処理にて画面上に払いだされたindexIdと配列番号で更新先を紐づける。*/
              getId.push(doc.id)
              // どんまいボタン押下制御用に読み込み時のどんまい数を配列にセット
              getDnm.push(doc.data().udomd)
            });
          }
          if(counter == 0){
            counter = 1
            // 初期カウンターセット
            setCf.push(counter)
            // 更新カウンターセット
            setCu.push(counter)
          } else {
            // 2回目の更新以降
            setCu.push(counter)
          }
      });
    },

    watch: {
      /* 更新カウンターが初期のカウンター数より大きくなった場合
      （情報に更新が発生した場合）ボタンの色を変更する。*/
      countUpd:function(){
        if(this.countUpd.length > this.countFirst.length){
          this.btnUpd = 'deepskyblue'
        }
      },
    },

    computed: {
      /* フォーム欄は名前と内容記入しないと投稿できないように制御 */
      invalid() {
        if(!this.setMsg || !this.setName){
          return true;
        }
        return false;
      },
    },

    methods:{
      /* 吐露ボタン */
      submit(){
        // Firebaseへ送信するデータを格納
        const nowTime = Timestamp.now();
        const ob = {
          uname: this.setName,
          umsg: this.setMsg,
          udomd: 0,
          date: nowTime,
        }

        // Firebaseへ送信
        addDoc(chatRef,ob); 

        // フォームクリア
        this.setMsg = "";
      },

      /* どんまいボタン */
      donotMind(indexId,setDoMd){
        setDoMd ++;
        /* 連続押下の制御 */
        // 初期処理時にセットしたどんまい数と画面上のどんまい数の差が-１の場合、Firestoreの値を更新
        if(setDoMd - this.setDnm[indexId] == 1){
          // Firestoreの値を更新
          const docRef = doc(db, "chats", this.setId[indexId]);
            updateDoc(docRef, {
            udomd: setDoMd
          });
          // 画面の値を更新
          this.messages[indexId].udomd = setDoMd         
        }
      },
      
      /* 更新ボタン */
      upBtn(){
        location.reload();
      },
    }
  }
</script>

<style scoped>
  .head{
    position: fixed;
  }
  .message {
    text-align: left;  
  }
  .cadDmd {
    text-align: left;
  }
</style>
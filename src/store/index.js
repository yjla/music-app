import { createStore } from 'vuex';
import {getLyric, phoneLogin, getUserInfo} from '@/api/axiosReq.js';

export default createStore({
	state: {
		playList: [{
			name: '两只老虎爱跳舞（抖音原版）',
			id: 1808319413,
			al: {
				name: '',
				picUrl: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
			},
		}],	
		playCurIdx: 0,
		lyric: '',
		curTime: 0,
		intervalId: 0,
		user: {
			isLogin: false,
			account: {},
			detail: {}
		}
	},
	getters: {
		lyricList(state) {
            return state.lyric.split(/\n/igs).map((item, i, arr) => {
				return {
					preLyricTime: i === 0 ? 0 : (arr[i-1].slice(1, 3) + arr[i-1].slice(4, 6))*1000,
					curLyricTime: (item.slice(1, 3) + item.slice(4, 6))*1000,
					text: i === 0 ? '' : arr[i-1].split(']')[1]
				};
            })
        }
	},
	mutations: {
		setPlayList(state, value) {
			state.playList = value;
		},
		pushPlayList(state, value) {
			state.playList.push(value);
		},
		setPlayIdx(state, value) {
			state.playCurIdx = value;
		},
		setLyric(state, value) {
			state.lyric = value;
		},
		setCurTime(state, value) {
			state.curTime = value;
		},
		setUser(state, value) {
			state.user = value;
		}
	},
	actions: {
		async reqLyric(content, payload) {
			// console.log(payload);
			let res = await getLyric(payload.id);
			// console.log(res);
			content.commit('setLyric', res.data.lrc.lyric);
		},
		async reqLogin(content, payload) {
			// console.log(payload);
			let res = await phoneLogin(payload.phone, payload.password);
			console.log(1, res);
			if (res.data.code === 200) {
				content.state.user.isLogin = true;
				content.state.user.account = res.data.account;
				let userDetail = await getUserInfo(res.data.account.id);
				console.log(2, userDetail);
				content.state.user.detail = userDetail.data;
				sessionStorage.userData = JSON.stringify(content.state.user);
				content.commit('setUser', content.state.user);
				console.log(content.state.user);
			}
			return res;
		}
	},
	modules: {
	}
});

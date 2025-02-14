import {Avatar, Box2, Icon, Text, ConnectedUsernames} from '../../../common-adapters'
import {assertionToDisplay} from '../../../common-adapters/usernames'
import * as Styles from '../../../styles'

export type Props = {
  badgeNumber?: number
  channelName?: string
  contactNames: Map<string, string>
  muted: boolean
  onOpenFolder?: () => void
  onShowProfile: (user: string) => void
  onShowInfoPanel: () => void
  onToggleThreadSearch: () => void
  teamName?: string
  theirFullname?: string
  participants: Array<string>
  pendingWaiting: boolean
  smallTeam: boolean
  unMuteConversation: () => void
}

const shhIconColor = Styles.globalColors.black_20
const shhIconFontSize = 24

const ShhIcon = (props: {onClick: () => void}) => (
  <Icon
    type="iconfont-shh"
    style={styles.shhIcon}
    color={shhIconColor}
    fontSize={shhIconFontSize}
    onClick={props.onClick}
  />
)

const ChannelHeader = (props: Props) => (
  <Box2 direction="vertical">
    <Box2 direction="horizontal" style={styles.channelHeaderContainer}>
      <Avatar teamname={props.teamName || undefined} size={props.smallTeam ? 16 : (12 as any)} />
      <Text
        type={
          Styles.isMobile
            ? props.smallTeam
              ? 'BodyBig'
              : 'BodyTinySemibold'
            : props.smallTeam
            ? 'BodyBig'
            : 'BodySemibold'
        }
        lineClamp={1}
        ellipsizeMode="middle"
        style={Styles.collapseStyles([styles.channelName, !props.smallTeam && styles.channelNameLight])}
      >
        &nbsp;
        {props.teamName}
      </Text>
      {props.smallTeam && props.muted && <ShhIcon onClick={props.unMuteConversation} />}
    </Box2>
    {!props.smallTeam && (
      <Box2 direction="horizontal" style={styles.channelHeaderContainer}>
        <Text type="BodyBig" style={styles.channelName} lineClamp={1} ellipsizeMode="tail">
          #{props.channelName}
        </Text>
        {props.muted && <ShhIcon onClick={props.unMuteConversation} />}
      </Box2>
    )}
  </Box2>
)

const UsernameHeader = (props: Props) => (
  <Box2 direction={props.theirFullname ? 'vertical' : 'horizontal'} style={styles.usernameHeaderContainer}>
    {!!props.theirFullname && (
      <Text lineClamp={1} type="BodyBig" fixOverdraw={true}>
        {props.theirFullname}
      </Text>
    )}
    <Box2 direction="horizontal" style={styles.nameMutedContainer}>
      <ConnectedUsernames
        colorFollowing={true}
        inline={false}
        lineClamp={props.participants.length > 2 ? 2 : 1}
        commaColor={Styles.globalColors.black_50}
        type={props.participants.length > 2 || !!props.theirFullname ? 'BodyTinyBold' : 'BodyBig'}
        usernames={props.participants}
        containerStyle={styles.center}
        onUsernameClicked={props.onShowProfile}
        skipSelf={props.participants.length > 1}
      />
      {props.muted && <ShhIcon onClick={props.unMuteConversation} />}
    </Box2>
  </Box2>
)

const PhoneOrEmailHeader = (props: Props) => {
  const phoneOrEmail = props.participants.find(s => s.endsWith('@phone') || s.endsWith('@email')) || ''
  const formattedPhoneOrEmail = assertionToDisplay(phoneOrEmail)
  const name = props.contactNames.get(phoneOrEmail)
  return (
    <Box2 direction="vertical" style={styles.usernameHeaderContainer}>
      <Box2 direction="horizontal" style={styles.lessMargins}>
        <Text type="BodyBig" lineClamp={1} ellipsizeMode="middle">
          {formattedPhoneOrEmail}
        </Text>
        {props.muted && <ShhIcon onClick={props.unMuteConversation} />}
      </Box2>
      {!!name && <Text type="BodyTiny">{name}</Text>}
    </Box2>
  )
}

const styles = Styles.styleSheetCreate(
  () =>
    ({
      center: {
        backgroundColor: Styles.globalColors.fastBlank,
        justifyContent: 'center',
        textAlign: 'center',
      },
      channelHeaderContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: Styles.globalMargins.tiny,
        paddingRight: Styles.globalMargins.tiny,
      },
      channelName: {color: Styles.globalColors.black},
      channelNameLight: {color: Styles.globalColors.black_50},
      lessMargins: {marginBottom: -5},
      nameMutedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      shhIcon: {marginLeft: Styles.globalMargins.xtiny},
      usernameHeaderContainer: {alignItems: 'center', justifyContent: 'center'},
    } as const)
)

export {ChannelHeader, PhoneOrEmailHeader, UsernameHeader}

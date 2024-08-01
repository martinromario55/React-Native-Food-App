import Colors from '@/constants/Colors'
import { forwardRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type ButtonProps = {
  text: string
} & React.ComponentPropsWithoutRef<typeof Pressable>

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable {...pressableProps} ref={ref} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    )
  }
)

export default Button

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
})
